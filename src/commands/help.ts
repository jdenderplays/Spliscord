import { Client, Message } from 'discord.js';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'info',
        description: 'Get various links for the bot.',
        aliases: ['invite', 'link', 'links'],
        usage: '',
        cooldown: 3,
        permissions: 0,
        args: null,
    });

    client.registry.on('info', ({message}) =>
    message.channel.send(
`**Spliscord** - Made by Jdender~/House Master (Dual mains)

Invite Link: <${client.inviteLink}>
GitHub: <${require('../../../package.json').homepage}>
        `));


    client.registry.addCommand({
        name:  'help',
        description:  'List all my commands or info about a specific command.',
        aliases: ['commands'],
        usage: '[Command name]',
        cooldown: 10,
        permissions: 0,
        args: null,
    });

    client.registry.on('help', ({message, args, prefix}) => {

        const data: string[] = [];

        if (!args._.length) {

            data.push('Here\'s a list of all my commands:');
            data.push(client.registry.commandRawNames.join(',\n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`);
            data.push('The key for the usage fields is `[optional] <required> [<optional>, <but both needed>]`');

            message.author.send(data.join('\n'), { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm')
                        message.channel.send('I\'ve sent you a DM with all my commands.');
                })
                .catch(() => message.channel.send('It seems like I can\'t DM you.'));

        } else {

            const command = client.registry.getCommand(args._[0]);

            if (!command)
                return message.channel.send('That\'s not a command I have.');

            data.push(`**Name:** ${command.name}`);
            data.push(`**Description:** ${command.description}`);

            if (command.aliases.length) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown} second(s)`);

            message.channel.send(data.join('\n'), { split: true });
        }
    });

};