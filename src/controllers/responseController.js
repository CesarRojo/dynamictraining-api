const responseServices = require('../services/responseServices');

const getAllResponses = async (req, res) => {
    try {
        const responses = await responseServices.getAllResponses();
        res.json(responses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createResponse = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('Received file:', req.file);
        // Validar que url llegue (campo obligatorio)
        if (!req.body.url || req.body.url.trim() === '') {
            return res.status(400).json({ error: 'url is required' });
        }

        // Construir objeto de datos para Response
        const responseData = {
            url: req.body.url,
            ownerType: req.body.ownerType || null, // Opcional, default null
            ...(req.body.response1 !== undefined ? { response1: req.body.response1 } : {}),
            ...(req.body.response2 !== undefined ? { response2: req.body.response2 } : {}),
            ...(req.body.grpId !== undefined ? { grpId: Number(req.body.grpId) } : {}),
        };

        // Si llega archivo, agregar URL de la imagen
        if (req.file) {
            responseData.url = `/uploads/${req.file.filename}`;
        }

        const response = await responseServices.createResponse(responseData);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating response:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllResponses,
    createResponse,
}