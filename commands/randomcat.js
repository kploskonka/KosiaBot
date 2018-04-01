const request = require('request');

module.exports = {
    name: 'randomcat',
    description: 'Wyświetla losowego kota!',
    aliases: ['kot', 'meow', 'rcat', 'rkot', 'losowykot'],
    cooldown: 10,
    execute(message, args) {
    	const url = 'http://aws.random.cat/meow';

    	request.get(url, (error, response, body) => {
    		try {
    			let json = JSON.parse(body);
    			message.channel.send(`${json.file}`);
    		}
    		catch (error) {
    			console.log(error);
    			if(error.name == "SyntaxError") {
    				message.channel.send('Wystąpiły problemy z połączeniem z API! Spróbuj ponownie.');
    			}
    		}
    	})
    },
};
