const request = require('request');
const Discord = require('discord.js');
const { serverIP } = require('./config.json');

module.exports = {
    name: 'pkmcstatus',
    description: 'Wyświetla status serwera ParkourMC!',
    aliases: ['pkmc', 'serverstatus'],
    cooldown: 20,
    execute(message, args) {
    	const url = 'https://api.skript.pl/server/'+ serverIP + '/';

    	request.get(url, (error, response, body) => {
    	    let json = JSON.parse(body);
    		const onlineStatus = `${json.online}`;
            const statusEmbed = new Discord.RichEmbed()
                .setTitle('Status serwera ParkourMC.pl');
            
            if (onlineStatus == 'true') {
                const onlinePlayers = `${json.players.online}`;
                const maxPlayers = `${json.players.max}`;
                statusEmbed.setColor('#33cc33');
                statusEmbed.setThumbnail('https://www.iconsdb.com/icons/preview/guacamole-green/ok-xxl.png');
                statusEmbed.addField('Status serwera:', 'Online');
                statusEmbed.addField('Gracze online: ', onlinePlayers + '/' + maxPlayers);
                statusEmbed.addField('IP serwera:', 'parkourmc.pl');
            } else if (onlineStatus == 'false') {
                statusEmbed.setColor('#ff0000');
                statusEmbed.setThumbnail('https://www.iconsdb.com/icons/preview/soylent-red/x-mark-3-xxl.png');
                statusEmbed.addField('Status serwera:', 'Offline');
                statusEmbed.addField('Przepraszamy za utrudnienia.', 'Jeżeli problem nie ustępuje w ciągu kilku minut, skontaktuj się z Administracją.');
            }

            message.channel.send({embed: statusEmbed});
    	})
    },
};
