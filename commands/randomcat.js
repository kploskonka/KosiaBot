const request = require('request');

module.exports = {
    name: 'randomcat',
    description: 'Wyświetla losowego kota!',
    aliases: ['kot', 'meow', 'rcat', 'rkot', 'losowykot'],
    execute(message, args) {
    	const url = 'http://aws.random.cat/meow';

    	request.get(url, (error, response, body) => {
    		let json = JSON.parse(body);
    		message.channel.send(`${json.file}`);
    	})
    },
};
