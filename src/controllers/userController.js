const userServices = require("../services/userServices")

const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}

const createUser = async (req, res) => {
    const { email, password, plant } = req.body;

    try {
        const user = await userServices.createUser(email, password, plant);
        res.status(201).json(user);    
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

module.exports = {
    getAllUsers,
    createUser,
}