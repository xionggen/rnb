const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config');
const jwt = require('jsonwebtoken');
const {responser} = require('../lib/responser');

exports.createToken = info => {
    const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN });
    return token;
}

const decodeToken = ctx => {
    const authorizationHeader = ctx.headers['authorization'];
    const token = authorizationHeader.split(' ')[1]; // 取到 token
    return jwt.decode(token);
}

exports.decodeToken = decodeToken;

// 检查权限 权限 1 为博主~
exports.checkAuth = ctx => {
    const { auth } = decodeToken(ctx);
    if (auth === 1) {
        return true;
    } else {
        responser(ctx, 401, '您无权限进行此操作', null);
        return false;
    }
}
