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
      Post.belongsTo(models.User, { foreignKey: "UserId" })
      Post.belongsTo(models.Tag, { foreignKey: "TagId" })
    }

    get formatPendingStatus() {
      if (this.pendingStatus === 1) {
        return 'Pending'
      } else if (this.pendingStatus === 2) {
        return 'Approved'
      } else {
        return 'Rejected'
      }
    }

    get dateFormat() {
      return formatDate(this.createdAt)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'title cannot be null' },
        notEmpty: { msg: 'title cannot be empty' },
        capitalWord(title) {
          let kataDepan = title[0]
          let pembanding = title[0].toLowerCase()

          if(kataDepan === pembanding) {
            throw new Error('the title must have a capital letter in front of the word')
          }
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'content cannot be null' },
        notEmpty: { msg: 'content cannot be empty' },
        minimumSentence(word) {
          let kata = word.split(' ').filter(el => el !== '').length
          if (kata < 10) {
            throw new Error('Content minimal 10 words')
          }
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Img Url cannot be null' },
        notEmpty: { msg: 'Img Url cannot be empty' },
        isUrl: { msg: 'Img Url must be URL' }
      }
    },
    pendingStatus: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User Id cannot be null' },
        notEmpty: { msg: 'User Id cannot be empty' }
      }
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category cannot be null' },
        notEmpty: { msg: 'Category cannot be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    hooks: {
      beforeCreate: (post, option) => {
        post.pendingStatus = 1
      }
    }
  });
  return Post;
};