module.exports = {
    name: 'kick',
    description: 'Wyrzuca gracza z serwera',
    usage: '<użytkownik>',
    aliases: ['wyrzuc'],
    execute(message, args) {
    	if (!message.mentions.users.size) {
			return message.reply('musisz otagować użytkownika, którego chcesz wyrzucić!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Chcesz wyrzucić: ${taggedUser.username}`);
    },
};