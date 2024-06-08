const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define('Factura', {
      ID_FACTURA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
        //autoIncrement: true
      },
      FECHA: {
        type: DataTypes.DATEONLY, // Solo año, mes y día
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      ID_CLIENTE: {
        
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ID_USUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      SUBTOTAL: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      TOTAL_PAGAR: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    }, {
      tableName: 'FACTURAS',
      timestamps: false
    });
  
    return Factura;
  };
  