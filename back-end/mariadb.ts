console.log("mariadb connection file ran!");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'socialgames',
    'root',
    'password',
    {
        host: '127.0.0.1',
        dialect: 'mariadb'
    }
)

async function connect() {
    try{
        await sequelize.authenticate();
        console.log("Connection with Mariadb has been established successfully.");
    } catch(error){
        console.error("Unable to connect to the database: ",error);
    }
}

connect();

module.exports = sequelize;