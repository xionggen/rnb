const moment = require('moment');

module.exports = (sequelize, dataTypes) => {
    return sequelize.define(
        'article',
        {
            id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
            title: { type: dataTypes.STRING(255), allowNull: false },
            content: { type: dataTypes.TEXT },
            showOrder: { type: dataTypes.INTEGER(11) }, // 置顶文章展示的 order
            createdAt: {
              type: dataTypes.DATE,
              defaultValue: dataTypes.NOW,
              get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
              }
            },
            updatedAt: {
              type: dataTypes.DATE,
              defaultValue: dataTypes.NOW,
              get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
              }
            }
          },
          {
            timestamps: true
          }
    )
}