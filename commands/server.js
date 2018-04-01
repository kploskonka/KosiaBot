module.exports = {
    name: 'server',
    description: 'Wyświetla informacje o serwerze',
    execute(message, args) {
        message.channel.send(`Nazwa serwera: ${message.guild.name}\nLiczba użytkowników: ${message.guild.memberCount}`);
    },
};