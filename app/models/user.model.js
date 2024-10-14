
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
	  id_user: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  username: {
		type: Sequelize.STRING,
		allowNull: false
	  },
	  role: {
		type: Sequelize.INTEGER,
		allowNull: false
	  },
	  password: {
		type: Sequelize.INTEGER, // Contraseña solo de números
		allowNull: false
	  },
	  creatiodate: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	  }
	});
  
	return User;
  };
  