const { MongoClient } = require('mongodb');
const adminClient = new MongoClient(process.env.DB_URI_ADMIN);
const gameClient = new MongoClient(process.env.DB_URI_GAME);

let adminDB, gameDB;

async function connectDB() {
    try {
        await adminClient.connect();
        await gameClient.connect();
        
        adminDB = adminClient.db(process.env.DB_NAME);
        gameDB = gameClient.db(process.env.DB_NAME);
        
        console.log("Đã kết nối Admin và Game DB thành công!");
    } catch (err) {
        console.error("Lỗi kết nối DB:", err);
    }
}

module.exports = { connectDB, adminDB: () => adminDB, gameDB: () => gameDB };