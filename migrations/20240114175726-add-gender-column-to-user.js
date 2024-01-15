module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
          await queryInterface.addColumn(
            'users',
            'gender',
            {
              type: Sequelize.DataTypes.STRING,
              defaultValue: 'woman',
            },
            { transaction }
          );
          await transaction.commit();
        } catch (err) {
          await transaction.rollback();
          throw err;
        }
    },
}
