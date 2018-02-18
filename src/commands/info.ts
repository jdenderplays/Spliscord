import { Command, CommandMessage, Client, Message } from '../cmdUtil/commands.b';

const info: Command = {
    name: 'info',
    aliases: ['information', 'about', ''],
    cooldown: 3,
    description: 'Ping!',
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    execute(client: Client, message: CommandMessage) {
        message.channel.send('For information or source for the bot please see the readme on github: https://github.com/jdenderplays/Spliscord/#readme');
    },
}

export default info;