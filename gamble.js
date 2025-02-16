const { EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    name: 'gamble',
    description: 'Gamble your money',
    async execute(message, args, client) {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = await User.create({ userId: message.author.id });
        }

        const amount = parseInt(args[0]);
        if (!amount || isNaN(amount)) {
            return message.reply('Please specify a valid amount to gamble!');
        }

        if (amount > user.balance) {
            return message.reply('You don\'t have enough money to gamble that amount!');
        }

        if (amount < 100) {
            return message.reply('You must gamble at least $100!');
        }

        const chance = Math.random();
        let won = false;
        let multiplier = 0;

        if (chance > 0.95) { // 5% chance to win big
            multiplier = 3;
            won = true;
        } else if (chance > 0.65) { // 30% chance to win small
            multiplier = 1.5;
            won = true;
        }

        const result = won ? amount * multiplier : 0;
        user.balance = user.balance - amount + result;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(won ? client.config.mainColor : client.config.secondaryColor)
            .setTitle(won ? '🎰 You Won!' : '🎰 You Lost!')
            .setDescription(won 
                ? `You gambled $${amount} and won $${result - amount}!\nNew balance: $${user.balance}`
                : `You gambled $${amount} and lost it all!\nNew balance: $${user.balance}`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 