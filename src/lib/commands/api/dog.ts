import { Command, CommandMessage, Client, phin } from '../../cmdUtil/commands.b';

const dog: Command = {
    name: 'api.dog',
    aliases: ['api.woof','api.bark','api.doggo'],
    cooldown: 5,
    description: 'Get a random dog image from `random.dog`.',
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {

        const response = await phin({
            url: 'https://random.dog/woof.json',
            parse: 'json',
        });

        message.channel.send(response.body.url);

    },
}

export default dog;