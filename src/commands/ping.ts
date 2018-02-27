import { Command, MessageCommandMeta, Spliscord, Message } from '../command-barrel';

export default class implements Command {

    name: 'ping';
    description: 'Ping!';
    aliases: ['pong', 'latency'];
    usage: 'ping';

    cooldown: 3;
    permissions: 0;

    checks: {
        guildOnly: false;
        guildConf: false;
        userConf: false;
    }

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        const pingMessage = await message.channel.send('Pinging...') as Message;

        pingMessage.edit(`Ponged. | The message ping is **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `The heartbeat ping is **${Math.round(client.ping)} ms**.` : ''}`);
    }

    init: null;
    shutdown: null;
}