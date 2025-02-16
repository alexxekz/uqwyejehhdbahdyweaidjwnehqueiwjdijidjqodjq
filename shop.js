const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'View the shop items',
    async execute(message, args, client) {
        const shopItems = [
            { name: '🎣 Fishing Rod', price: 2500, id: 'fishing_rod', description: 'Use this to catch fish and earn money' },
            { name: '⛏️ Pickaxe', price: 3000, id: 'pickaxe', description: 'Mine valuable resources' },
            { name: '🎫 Lucky Ticket', price: 1000, id: 'lucky_ticket', description: 'Try your luck to win big prizes' },
            { name: '💼 Business License', price: 10000, id: 'business_license', description: 'Start your own business' },
            { name: '👑 VIP Status', price: 50000, id: 'vip', description: 'Get exclusive benefits and bonuses' }
        ];

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle('🛍️ Evolution Shop')
            .setDescription('Use `$buy <item_id>` to purchase an item')
            .addFields(
                shopItems.map(item => ({
                    name: `${item.name} - $${item.price}`,
                    value: `ID: \`${item.id}\`\n${item.description}`
                }))
            )
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 