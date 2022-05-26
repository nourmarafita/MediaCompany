'use strict';
const formatDate = require('../helpers/formatdate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: "UserId"})
      Post.belongsTo(models.Tag, {foreignKey: "TagId"})
    }
    
    get formatPendingStatus () {
      if(this.pendingStatus === 1) {
        return 'Pending'
      }else if (this.pendingStatus === 2) {
        return 'Approved'
      }else {
        return 'Rejected'
      }
    }

    get dateFormat () {
      return formatDate(this.createdAt)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    pendingStatus: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
    hooks: {
      beforeCreate: (post, option) => {
        if(post) {
          
        }
      }
    }
  });
  return Post;
};