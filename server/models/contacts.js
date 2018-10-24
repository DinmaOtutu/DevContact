module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exist'
      },
      validate: {
        notEmpty: { msg: 'username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exist'
      },
      validate: {
        isEmail: { msg: 'email is required' },
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'fullname is required' }
      }
    },
    category: {
      type: DataTypes.ENUM,
      values: [
        'frontend developer',
        'backend developer',
        'UI/UX developer',
        'others'
      ],
      allowNull: true,
      validate: {
        isIn: {
          args: [['frontend developer', 'backend developer', 'UI/UX developer',  'others']],
          msg: 'invalid category'
         }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'passsowrd is required' }
      }
    },
});
return Contacts;
};


