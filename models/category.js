// Category Table
const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});