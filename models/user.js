// Requiring bcrypt for password hashing
const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // first_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // last_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // bio: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  });

  // This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });


// //Many to Many  
// User.associate = function(models) {
//   User.belongsToMany(models.Category, {through: models.UserCategory});
// };


//One to Many
User.associate = function(models) {
  User.belongsTo(models.Category, {
    foreignKey: {
      allowNull: true
    }
  });
};

  return User;
};
