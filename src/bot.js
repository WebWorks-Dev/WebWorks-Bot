const { REST, Routes, Client, GatewayIntentBits, Partials, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");
const {CreatePayment} = require("./commands/create-payment");
const {CreateTicket} = require("./commands/create-ticket");
const {CloseTicket} = require("./commands/close-ticket");
require("./commands/create-payment");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const token = "";
const clientId = "";

let tickets = [];

const RegisterSlashCommands = () => {
    const rest = new REST({version: "10"}).setToken(token);

    // rest.delete(Routes.applicationGuildCommand(clientId, "1176583715112104016", '1176618797067665569'))

    (async () => {
        await rest.put(
            Routes.applicationGuildCommands(clientId, "1176583715112104016"),{
                body: [
                    new SlashCommandBuilder()
                        .setName("create-payment")
                        .setDescription("Create payment link for user.")
                        .setDefaultMemberPermissions(8)
                        .addStringOption(option =>
                            option.setName("amount")
                                .setDescription("The amount the user must pay!")
                        ),
                    new SlashCommandBuilder()
                        .setName("create-ticket")
                        .setDescription("Create commission ticket."),
                    new SlashCommandBuilder()
                        .setName("close-ticket")
                        .setDescription("Close the current commission ticket.")
                        .setDefaultMemberPermissions(8)
                ]
            });
    })();
};

// RegisterSlashCommands();

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "create-payment":
            await CreatePayment(interaction);
            return;
        case "create-ticket":
            await CreateTicket(interaction, tickets);
            return;
        case "close-ticket":
            await CloseTicket(interaction, tickets);
            return;
    }
})

client.on("messageReactionAdd", (messageReaction, user) => {
    if (messageReaction.message.id !== "1176603858412245032" || messageReaction.emoji.name !== "✅") return;

    const guildMember = messageReaction.message.guild.members.cache.get(user.id);
    const role = messageReaction.message.guild.roles.cache.get("1176593588226895913");

    guildMember.roles.add(role)
        .then(e => console.log(`Verified ${user.id}`))
        .catch(e => console.log(`Failed to verify ${user.id}`));
})

client.login(token)
    .then(r => console.log("Starting Server"))
    .catch(e => console.error("Failed to start Server"));