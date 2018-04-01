module.exports = {
    name: 'user-info',
    description: 'Wyświetla informacje o użytkowniku',
    execute(message, args) {
        message.channel.send(`Twoja nazwa: ${message.author.username}\nTwoje ID: ${message.author.id}`);
    },
};