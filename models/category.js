module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //Many to Many    
    Category.associate = function(models) {
        Category.belongsToMany(models.User, {
            through: "UserCategory",
        as: "user",
        foreignKey: "category_id"
    }); //Do we need to add casecade on delete, or is by default?
    };

    //One to Many
    // Category.associate = function (models) {
    //     Category.hasMany(models.User); //Do we need to add casecade on delete, or is by default?
    // };

    return Category;
};