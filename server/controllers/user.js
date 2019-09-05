const Joi = require('joi');
const {Op} = require('sequelize');
const UserSchema = require('../schemas/user');

const { user: UserModel, comment: CommentModel, reply: ReplyModel, sequelize } = require('../models');
const { encrypt, comparePassword } = require('../lib/bcrypt');
const { createToken, checkAuth } = require('../lib/token');
const {responser} = require('../lib/responser');

// const emailRegexp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

module.exports = {
    async register(ctx) {
        const { username, password, email } = ctx.request.body;
        const validator = Joi.validate({ username, password, email }, UserSchema.regiester);
        if (validator.error) {
            responser(ctx, 400, validator.error.message, null);
        } else {
            const result = await UserModel.findOne({ where: { email } });
            if (result) {
                responser(ctx, 400, '邮箱已被注册', null);
            } else {
                const user = await UserModel.findOne({ where: { username } });
                if (user) {
                    responser(ctx, 400, '用户名已被占用', null);
                } else {
                    const saltPassword = await encrypt(password);
                    await UserModel.create({ username, password: saltPassword, email });
                    responser(ctx, 200, '注册成功', null);
                }
            }
        }
    },

    async login(ctx) {
        const { account, password } = ctx.request.body;
        const validator = Joi.validate({ account, password }, UserSchema.login)
        if (validator.error) {
            responser(ctx, 400, validator.error.message, null);
        } else {
            const user = await UserModel.findOne({
                where: {
                    [Op.or]: [{username: account}, {email: account}]
                }
            })
            if (!user) {
                responser(ctx, 400, '用户不存在', null);
            } else {
                const isMatch = await comparePassword(password, user.password);
                if (!isMatch) {
                    responser(ctx, 400, '密码不正确', null);
                } else {
                    const { id, auth, username, email } = user;
                    const token = createToken({ username, userId: id, auth, email }) // 生成 token
                    responser(ctx, 200, '登录成功', {username, auth, token});
                }
            }
        }
    },

    /**
     * 更新账户信息
     *
     */
    async updateUser(ctx) {
        const userId = parseInt(ctx.params.id); // userId
        const { username, oldPassword, password, email } = ctx.request.body;
        const user = await UserModel.findByPk(userId); // 为什么不直接用 update ==> 防止不法分子直接把博主的密码改了，或者其他...
        let code = null;
        let msg = null;
        let data = null;

        if (!user.email) {
            const result = await UserModel.findOne({ where: { email } });
            if (result) {
                code = 400;
                msg = '该邮箱已被注册';
            } else {
                await UserModel.update({ email }, { where: { id: userId } });
                code = 200;
                msg = `已成功绑定邮箱${email}`;
            }
        } else {
            if (oldPassword) {
                const isMatch = await comparePassword(oldPassword, user.password);
                if (isMatch) {
                    if (!username && !password) {
                        code = 400;
                        msg = '用户名或密码错误';
                    } else if (username && !password) {
                        const result = await UserModel.findOne({ where: { username } });
                        if (result) {
                            code = 400;
                            msg = '用户名已被占用';
                        } else {
                            await UserModel.update({ username }, { where: { id: userId } });
                            code = 200;
                            msg = '用户名修改成功';
                        }
                    } else if (!username && password) {
                        const saltPassword = await encrypt(password);
                        await UserModel.update({ password: saltPassword }, { where: { id: userId } });
                        code = 200;
                        msg = '密码修改成功';
                    } else if (username && password) {
                        const result = await UserModel.findOne({ where: { username } });
                        if (result && result.username !== username) {
                            code = 400;
                            msg = '用户名已被占用';
                        } else {
                            const saltPassword = await encrypt(password)
                            await UserModel.update({ username, password: saltPassword }, { where: { id: userId } })
                            code = 200;
                            msg = '修改成功';
                        }
                    }
                } else {
                    code = 400;
                    msg = '密码不正确';
                }
            } else {
                code = 400;
                msg = '请输入原密码验证您的身份';
            }
        }

        if (code === 200) {
            const result = await UserModel.findById(userId);
            const { username, id, email, auth } = result;
            let token = createToken({ username, userId: id, auth, email }); // 生成 token
            data = {token};
        }
        responser(ctx, code, msg, data);
    },

    async getUserList(ctx) {
        const isAuth = checkAuth(ctx);
        if (isAuth) {;
            let { page = 1, pageSize = 10, username } = ctx.query;
            const offset = (page - 1) * pageSize;
            pageSize = parseInt(pageSize);

            const params = username ? { username: { [Op.like]: `%${username}%` } } : {};

            const data = await UserModel.findAndCountAll({
                attributes: ['id', 'username', 'createdAt'],
                where: { auth: 2, ...params },
                include: [{ model: CommentModel, attributes: ['id'], include: [{ model: ReplyModel, attributes: ['id'] }] }],
                offset,
                limit: pageSize,
                row: true,
                distinct: true,
                order: [['createdAt', 'DESC']]
            })
            responser(ctx, 200, '查询列表成功', ...data);
        }
    },

    async delete(ctx) {
        const isAuth = checkAuth(ctx);
        if (isAuth) {
            let { userId } = ctx.query;
            userId = parseInt(userId);
            await sequelize.query(`delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${userId}`);
            await UserModel.destroy({ where: { id: userId } });
            responser(ctx, 200, '成功删除用户', null);
        }
    }
}
