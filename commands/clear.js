module.exports = {
    name: 'clear',
    description: 'Usuwa daną ilość wiadomości',
    usage: '<liczba wiadomosci>',
    cooldown: 10,
    aliases: ['wyczysc', 'prune'],
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('podana liczba jest niepoprawna!');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('musisz podać liczbę w przedziale od 1 do 100');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Wystąpił błąd podczas usuwania wiadomości.');
		});
    },
};