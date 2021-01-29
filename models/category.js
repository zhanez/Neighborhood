module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //One to Many
    Category.associate = function (models) {
        Category.hasMany(models.User); //Do we need to add casecade on delete, or is by default?
    };

    return Category;
};