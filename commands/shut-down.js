module.exports = {
    name: 'shut-down',
    description: 'Zamyka bota',
    aliases: ['kill', 'sd', 'quit'],
    execute(message, args) {
        message.channel.send('Zamykam KosiaBota');
        process.exit();
    },
};