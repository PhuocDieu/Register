const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    serviceType: String,
    message: String,
    file: String, // URL to the uploaded file
    status: { type: String, default: 'Pending' },
    paymentStatus: { type: String, default: 'Unpaid' }
});

module.exports = mongoose.model('Service', ServiceSchema);
