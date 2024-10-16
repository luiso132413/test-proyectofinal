module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
		id_emp: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nombre: {
			type: Sequelize.STRING,
			allowNull: false
		},
		apellido: {
			type: Sequelize.STRING,
			allowNull: false
		},
		rol: {
			type: Sequelize.STRING,
			allowNull: false
		},
		correo: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		sueldo: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false
		},
		fechaCreacion: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	});

	return Empleado;
};
