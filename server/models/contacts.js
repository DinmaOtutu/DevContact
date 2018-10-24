module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        notEmpty: { msg: 'category is required' }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'passsowrd is required' }
      }
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'bio is required' }
      }

    },
});
return Contacts;
};


