const{Sequelize}=require('sequelize')
const sequelize = new Sequelize('haspatal', 'postgres', 'susrada', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB Connection successful..........');
    } catch (error) {
        console.error('Unable to connect....', error);
    }
}

testConnection();

module.exports= sequelize