module.exports = {
    name: 'avatar',
    description: 'Wyświetla avatar użytkownika.',
    usage: '<użytkownik>',
    aliases: ['icon', 'profilepicture', 'pic', 'profilowe'],
    cooldown: 10,
    execute(message, args) {
        if (!message.mentions.users.size) {
			return message.channel.send(`Twój avatar: ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `Avatar ${user.username}: ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
    },
};