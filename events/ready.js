module.exports.run = (client) => {
    console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

    console.info(client.users.map(u=> `${u.username}#${u.discriminator}`).join(', '));
}