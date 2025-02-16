const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'money'],
    description: 'Check your or another user\'s balance',
    execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = db.getUser(target.id);

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle(`${target.username}'s Balance`)
            .setDescription(`💵 **Wallet**: $${user.balance.toLocaleString()}\n🏦 **Bank**: $${user.bank.toLocaleString()}\n💰 **Net Worth**: $${(user.balance + user.bank).toLocaleString()}`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
}; 