/**
 * @description 数据库配置
 */

module.exports = {
    database: 'blog', // 数据库名
    user: 'root', // 数据库用户名
    password: 'root', // 数据库密码
    // 数据库配置项
    options: {
        host: 'localhost', // 主机名
        dialect: 'mysql', // 数据库类型
        pool: { // 连接池参数
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false, // 默认不加时间戳
            freezeTableName: true, // 默认表名不加s
        },
        // timezone: '+08.00' // 东八时区
    }
}