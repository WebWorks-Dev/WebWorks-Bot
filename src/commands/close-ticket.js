const CloseTicket = async (interaction, tickets) => {
    if (interaction.channel.parentId !== "1176615236187463911") {
        return interaction.reply("Invalid category, must be in tickets!");
    }

    interaction.channel.setParent("1176687805473234964");

    await interaction.reply("‎");
    await interaction.deleteReply();

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].user === interaction.user.id) {
            tickets.splice(i, 1);
        }
    }
};

module.exports = {
    CloseTicket
};