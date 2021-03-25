const { DataTypes } = require('sequelize');

module.exports = model;

// creation of db
function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      attributes: {}
    },
    scopes: {},
    timestamps: false, // avoid creation of created_at fields
  };

  return sequelize.define('Country', attributes, options);
}