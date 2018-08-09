var bcrypt = require("bcrypt-nodejs");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "hacktheplanet",
      database: "todoagain_db"
  });
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: function(user) {
          var salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // create all the defined tables in the specified database.

  // sequelize.sync()
  //     .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
  //     .catch(error => console.log('This error occured', error));

  // export User model for use in other files.
  User.sync();
  return User;
};
