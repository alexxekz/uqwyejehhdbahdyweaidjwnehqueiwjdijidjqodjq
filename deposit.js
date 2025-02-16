const { EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposit money into your bank',
    async execute(message, args, client) {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = await User.create({ userId: message.author.id });
        }

        const amount = args[0] === 'all' ? user.balance : parseInt(args[0]);
        if (!amount || isNaN(amount)) {
            return message.reply('Please specify a valid amount to deposit!');
        }

        if (amount > user.balance) {
            return message.reply('You don\'t have enough money to deposit that amount!');
        }

        user.balance -= amount;
        user.bank += amount;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle('💳 Deposit Successful')
            .setDescription(`You deposited $${amount} into your bank!\nNew bank balance: $${user.bank}`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 