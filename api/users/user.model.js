const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');

module.exports = model;

// creation of db
function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    real_name: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },  //password
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.BIGINT, field: 'created_at', defaultValue: Date.now() },
  };

const options = {
  defaultScope: {
    // exclude hash by default
    attributes: { exclude: ['hash'] }
  },
  scopes: {
    withHash: { attributes: {}, },
  },

  //prevent creation of default timestamps
  timestamps: false,
};

  return sequelize.define('User', attributes, options);
}