const CreateTicket = async (interaction, tickets) => {
    const ticket = tickets.find(ticket => ticket.user === interaction.user.id);

    if (ticket) {
        return interaction.reply(`You already have an active ticket, <#${ticket.channel}>`);
    }

    interaction.member.guild.channels.create({
        name: `Ticket ${tickets.length}`,
        parent: "1176615236187463911",
        type: 0,
        permissionOverwrites: [
            {
                id: interaction.user.id,
                allow: 1n << 10n
            },
            {
                id: "1176593495306285136",
                allow: 1n << 10n
            },
            {
                id: interaction.member.guild.id,
                deny: 1n << 10n
            }
        ]
    }).then(channel => {
        channel.send(`Thanks for creating a ticket. We will get to you soon! \n <@&1176593495306285136> <@${interaction.user.id}>`);

        tickets.push({
            user: interaction.user.id,
            channel: channel.id
        });
    });

    await interaction.reply("‎");
    await interaction.deleteReply();
};

module.exports = {
    CreateTicket
};