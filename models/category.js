module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Category.associate = function (models) {
        Category.belongsToMany(models.User, { through: models.UserCategory }); //Do we need to add casecade on delete, or is by default?
    };

    return Category;
};