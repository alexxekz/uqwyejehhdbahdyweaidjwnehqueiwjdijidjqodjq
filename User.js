const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    lastDaily: { type: Date },
    lastWeekly: { type: Date },
    lastWork: { type: Date },
    inventory: [{
        item: { type: String },
        amount: { type: Number }
    }],
    job: { type: String, default: 'unemployed' },
    experience: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
    marriedTo: { type: String, default: null },
    businessName: { type: String },
    businessLevel: { type: Number, default: 1 },
    businessIncome: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema); 