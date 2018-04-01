const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Lista komend lub informacje o podanej komendzie.',
    aliases: ['commands', 'komendy', 'pomoc'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;
		const data = [];

		if (!args.length) {
			data.push('Lista wszystkich komend:');
			data.push(`\n\`` + commands.map(command => command.name).join('\`, \`'));
			data.push(`\`\n \nWpisz \`${prefix}help [komenda]\` by zobaczyc informacje o danej komendzie!`);
		} else {
    		if (!commands.has(args[0])) {
    		return message.reply('that\'s not a valid command!');
			}

			const command = commands.get(args[0]);

			data.push(`**Nazwa:** ${command.name}`);

			if (command.description) data.push(`**Opis:** ${command.description}`);
			if (command.aliases) data.push(`**Aliasy:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`);

			data.push(`**Czas odnowienia:** ${command.cooldown || 3} sekund`);
		}
		message.author.send(data, { split: true })
    	.then(() => {
        	if (message.channel.type !== 'dm') {
            	message.channel.send('Otrzymałeś listę komend w prywatnej wiadomości!');
        	}
    	})
    	.catch(() => message.reply('nie mogę wysłać do Ciebie prywatnej wiadomości!'));    
	},
};