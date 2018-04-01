const { prefix, token } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Połączono jako ${client.user.tag}`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

	if (command.args && !args.length) {
        let reply = `Nie podałeś żadnych argumentów, ${message.author}!`;

        if (command.usage) {
           reply += `\nWłaściwe użycie: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
   	}

   	if (!cooldowns.has(command.name)) {
    	cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
    	timestamps.set(message.author.id, now);
    	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	} else {
    	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    	if (now < expirationTime) {
        	const timeLeft = (expirationTime - now) / 1000;
        	return message.reply(`Odczekaj ${timeLeft.toFixed(1)} sekund by ponownie użyć komendy \`${command.name}\``);
    	}

    	timestamps.set(message.author.id, now);
    	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
    	command.execute(message, args);
	}
	catch (error) {
    	console.error(error);
    	message.reply('Wystąpił błąd podczas wykonywania komendy.');
	}
});

client.login(token);

