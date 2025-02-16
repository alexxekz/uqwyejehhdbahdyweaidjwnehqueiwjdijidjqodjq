const { EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    async execute(message, args, client) {
        if (!args[0]) {
            return message.reply('Please specify an item ID to buy!');
        }

        const shopItems = {
            'fishing_rod': { name: '🎣 Fishing Rod', price: 2500 },
            'pickaxe': { name: '⛏️ Pickaxe', price: 3000 },
            'lucky_ticket': { name: '🎫 Lucky Ticket', price: 1000 },
            'business_license': { name: '💼 Business License', price: 10000 },
            'vip': { name: '👑 VIP Status', price: 50000 }
        };

        const itemId = args[0].toLowerCase();
        const item = shopItems[itemId];

        if (!item) {
            return message.reply('That item doesn\'t exist! Use `$shop` to see available items.');
        }

        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = await User.create({ userId: message.author.id });
        }

        if (user.balance < item.price) {
            return message.reply(`You need $${item.price} to buy this item! You only have $${user.balance}.`);
        }

        // Add item to inventory
        const inventoryItem = user.inventory.find(i => i.item === itemId);
        if (inventoryItem) {
            inventoryItem.amount += 1;
        } else {
            user.inventory.push({ item: itemId, amount: 1 });
        }

        user.balance -= item.price;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(client.config.mainColor)
            .setTitle('Purchase Successful!')
            .setDescription(`You bought ${item.name} for $${item.price}!`)
            .setFooter({ text: client.config.botName, iconURL: client.user.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
}; 