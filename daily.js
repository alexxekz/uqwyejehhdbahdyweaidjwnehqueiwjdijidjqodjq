const { EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    name: 'daily',
    description: 'Collect your daily reward',
    async execute(message, args, client) {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = await User.create({ userId: message.author.id });
        }

        const cooldown = 86400000; // 24 hours in milliseconds
        if (user.lastDaily && Date.now() - user.lastDaily < cooldown) {
            const timeLeft = Math.ceil((cooldown - (Date.now() - user.lastDaily)) / 1000 / 60 / 60);
            return message.reply(`You need to wait ${timeLeft} hours before collecting your daily reward again!`);
        }

        const reward = 1000;
        user.balance += reward;
        user.lastDaily = Date.now();
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle('Daily Reward!')
            .setDescription(`You collected your daily reward of $${reward}!`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 