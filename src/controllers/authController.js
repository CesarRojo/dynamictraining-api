const authServices = require("../services/authServices");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await authServices.loginUser(email, password);
        res.json(data);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    login,
}