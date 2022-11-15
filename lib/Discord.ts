import { Wish } from '@prisma/client';
import { Client as DiscordClient, GatewayIntentBits } from 'discord.js';
import { WishContext } from './WishContext';

// https://discord.com/api/oauth2/authorize?client_id=1042173791134035978&permissions=3072&scope=bot

let discord: DiscordClient | null = null;
export const useDiscord = () => {
    if (!discord) {
        discord = new DiscordClient({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
        });

        discord.on('ready', () => {
            console.log('Logged in!');
        });

        discord.on('messageCreate', async (msg) => {
            const content = msg.content;
            if (content.startsWith('!wishfor')) {
                const name = content.split(' ').slice(1).join(' ');

                try {
                    await WishContext.addEntry({ Name: name, Order: 999999, Price: 999 } as Wish);
                    msg.channel.send('Cool! I added it to the wish list!');
                } catch {
                    msg.channel.send('I failed to add that entry.');
                }
            }
        });

        // CLIENT_TOKEN needed in .env file
        discord.login(process.env.CLIENT_TOKEN);
    }
};
