const Io = require("../utils/io");
const usersDb = new Io(`${process.cwd()}/database/users.json`); 
const getUsers = async(req, res) => {
    try {
        const users = await usersDb.read();
        res.json({message: "Success", data: users})
    } catch (error) {
        res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = {
    getUsers
}