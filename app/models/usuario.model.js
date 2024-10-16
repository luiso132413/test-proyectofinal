module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {	
		id_user: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nombreUsuario: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		contraseña: {
			type: Sequelize.STRING, // Cambio a STRING para manejar contraseñas encriptadas
			allowNull: false
		},
		rol: {
			type: Sequelize.STRING,
			allowNull: false
		},
		fechaCreacion: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		id_emp: {
			type: Sequelize.INTEGER,
			references: {
				model: 'empleados', // Nombre de la tabla referenciada
				key: 'id_emp'
			}
		}
	});

	return Usuario;
};
