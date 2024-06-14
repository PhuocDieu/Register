const express = require('express');
const multer = require('multer');
const Service = require('../models/Service');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
    const { name, email, phone, serviceType, message } = req.body;
    const file = req.file ? req.file.path : '';
    const newService = new Service({ name, email, phone, serviceType, message, file });

    try {
        const savedService = await newService.save();
        res.json(savedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/payment', async (req, res) => {
    // Process payment (Stripe integration can be added here)
    res.json({ status: 'success' });
});

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
