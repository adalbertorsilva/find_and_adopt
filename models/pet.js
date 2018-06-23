'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Pet extends Model {
    static init (sequelize) {
      return super.init({
        location: DataTypes.GEOMETRY('POINT'),
        description: DataTypes.TEXT,
        photo: DataTypes.STRING,
        created_at: DataTypes.DATE
      }, { sequelize, underscored: true, timestamps: false })
    }

    static async searchAnimals (searchAttributes) {
      return sequelize.query('SELECT * FROM "Pets" WHERE ST_DWithin(location::geography, ST_MakePoint(:longitude,:latitude)::geography, :radius)', { replacements: { longitude: searchAttributes.longitude, latitude: searchAttributes.latitude, radius: searchAttributes.radius }, model: Pet })
    }
  }

  return Pet
}
