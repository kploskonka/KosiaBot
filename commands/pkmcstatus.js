const request = require('request');
const Discord = require('discord.js');

module.exports = {
    name: 'pkmcstatus',
    description: 'Wyświetla status serwera ParkourMC!',
    aliases: ['pkmc', 'serverstatus'],
    cooldown: 20,
    execute(message, args) {
    	const url = 'https://api.skript.pl/server/46.105.209.78/';

    	request.get(url, (error, response, body) => {
    	    let json = JSON.parse(body);
    		const onlineStatus = `${json.online}`;
            const richEmbed = new Discord.RichEmbed()
                .setTitle('Status serwera ParkourMC.pl');
            
            if (onlineStatus == 'true') {
                const onlinePlayers = `${json.players.online}`;
                const maxPlayers = `${json.players.max}`;
                richEmbed.setColor('#33cc33');
                richEmbed.setThumbnail('https://www.iconsdb.com/icons/preview/guacamole-green/ok-xxl.png');
                richEmbed.addField('Status serwera:', 'Online');
                richEmbed.addField('Gracze online: ', onlinePlayers + '/' + maxPlayers);
                richEmbed.addField('IP serwera:', 'parkourmc.pl');
            } else if (onlineStatus == 'false') {
                richEmbed.setColor('#ff0000');
                richEmbed.setThumbnail('https://www.iconsdb.com/icons/preview/soylent-red/x-mark-3-xxl.png');
                richEmbed.addField('Status serwera:', 'Offline');
                richEmbed.addField('Przepraszamy za utrudnienia.', 'Jeżeli problem nie ustępuje w ciągu kilku minut, skontaktuj się z Administracją.');
            }

            message.channel.send({embed: richEmbed});
    	})
    },
};
