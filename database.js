const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataPath = path.join(__dirname, '../data');
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

// Path to our JSON database file
const dbPath = path.join(dataPath, 'users.json');

// Initialize empty database if it doesn't exist
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}));
}

class Database {
    constructor() {
        this.data = this.loadData();
    }

    loadData() {
        try {
            const data = fs.readFileSync(dbPath);
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    }

    saveData() {
        fs.writeFileSync(dbPath, JSON.stringify(this.data, null, 2));
    }

    getUser(userId) {
        if (!this.data[userId]) {
            this.data[userId] = {
                userId: userId,
                balance: 0,
                bank: 0,
                lastDaily: null,
                lastWeekly: null,
                lastWork: null,
                inventory: [],
                job: 'unemployed',
                experience: 0,
                level: 1,
                badges: [],
                marriedTo: null,
                businessName: null,
                businessLevel: 1,
                businessIncome: 0
            };
            this.saveData();
        }
        return this.data[userId];
    }

    updateUser(userId, data) {
        this.data[userId] = { ...this.data[userId], ...data };
        this.saveData();
        return this.data[userId];
    }
}

module.exports = new Database(); 