const isDev = process.env.NODE_ENV === 'development'

const config = {
  database: isDev ? 'blog' : '',
  user: isDev ? 'root' : '',
  password: isDev ? 'root' : '',
  options: {
    host: isDev ? 'localhost' : '', // 连接的 host 地址
    dialect: 'mysql', // 连接到 mysql
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false, // 默认不加时间戳
      freezeTableName: true // 表名默认不加 s
    },
    timezone: '+08:00'
  }
}

module.exports = config
