/**
 * @description 服务端配置项
 */

const db = require('./db');

module.exports = {
    db,
    SALT_WORK_FACTOR: 10, // 生成salt的迭代次数
    TOKEN_SECRET: 'rnb', // token秘钥原始值
    TOKEN_EXPIRESIN: '720h', // token有效期
    ENABLE_EMAIL_NOTICE: false, // 是否开启邮件通知功能 
    // 邮箱的 config 
    emailTransporterConfig: {
        host: '',
        port: '',
        secure: true, // true for 465, false for other ports
        auth: {
            user: '', // generated ethereal user
            pass: '' // generated ethereal password 授权码 而非 密码
        }
    },
    WEB_HOST: 'localhost:6060', // 主机地址（端口）
}