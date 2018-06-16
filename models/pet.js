'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Pet extends Model {
    static init (sequelize) {
      return super.init({
        location: DataTypes.GEOMETRY,
        description: DataTypes.TEXT,
        photo: DataTypes.STRING
      }, { sequelize, underscored: true, timestamps: false })
    }

    static async findNotifiedAreas (location, radius) {
      return sequelize.query('SELECT * FROM "Pets" WHERE ST_DWithin(point::geography, ST_MakePoint(:longitude,:latitude)::geography, :radius)', { replacements: { longitude: location.longitude, latitude: location.latitude, radius }, model: Pet })
    }
  }

  return Pet
}
