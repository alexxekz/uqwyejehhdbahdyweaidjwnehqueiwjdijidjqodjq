const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');

module.exports = {
    name: 'work',
    description: 'Work to earn money',
    cooldown: 3600, // 1 hour cooldown
    execute(message, args, client) {
        const user = db.getUser(message.author.id);

        if (user.lastWork && Date.now() - user.lastWork < 3600000) {
            const timeLeft = Math.ceil((3600000 - (Date.now() - user.lastWork)) / 1000 / 60);
            return message.reply(`You need to wait ${timeLeft} minutes before working again!`);
        }

        const jobs = {
            'unemployed': { min: 50, max: 100 },
            'waiter': { min: 100, max: 200 },
            'developer': { min: 300, max: 500 },
            'ceo': { min: 1000, max: 2000 }
        };

        const currentJob = jobs[user.job] || jobs['unemployed'];
        const earned = Math.floor(Math.random() * (currentJob.max - currentJob.min + 1)) + currentJob.min;

        db.updateUser(user.userId, {
            balance: user.balance + earned,
            lastWork: Date.now()
        });

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle('Work Complete!')
            .setDescription(`You worked as a ${user.job === 'unemployed' ? 'freelancer' : user.job} and earned $${earned}!`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 