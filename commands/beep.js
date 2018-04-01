module.exports = {
    name: 'beep',
    cooldown: 5,
    description: 'Boop!',
    execute(message, args) {
        message.channel.send('Boop.');
    },
};