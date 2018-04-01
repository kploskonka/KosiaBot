module.exports = {
    name: 'role',
    description: 'Nadaje rolę użytkownikowi.',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('musisz otagować użytkownika, któremu chcesz nadać rolę!');
        }
        if (!message.mentions.roles.size) {
            return message.reply('musisz otagować rolę, którą chcesz przydzielić');
        }

        let taggedGuildMember = message.guild.member(message.mentions.users.first());
        const updatedRole = message.mentions.roles.first();
        taggedGuildMember.setRoles([updatedRole]).then(console.log).catch(console.error);;

        message.channel.send(`Użytkownik ${taggedGuildMember.username} otrzymał rolę ${updatedRole.name}`);
    },
};