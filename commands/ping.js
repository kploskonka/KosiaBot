module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        message.channel.send('Pong. Twój ping to ' + message.client.ping);
    },
};
