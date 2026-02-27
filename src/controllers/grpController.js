const grpServices = require('../services/grpServices');

const getAllGrps = async (req, res) => {
    try {
        const grps = await grpServices.getAllGrps();
        res.json(grps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createGrp = async (req, res) => {
    try {
        const grp = await grpServices.createGrp(req.body);
        res.status(201).json(grp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllGrps,
    createGrp,
}