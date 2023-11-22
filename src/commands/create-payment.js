const {EmbedBuilder} = require("discord.js");
const stripe = require("stripe")("");

const CreatePayment = async (interaction) => {
    const amount = interaction.options.get("amount");

    if (!amount) {
        return interaction.reply("Invalid params");
    }

    const price = await stripe.prices.create({
        unit_amount: amount.value * 100,
        currency: 'usd',
        product_data: {
            name: "WebWorks Payment."
        }
    });

    const paymentLink = await stripe.paymentLinks.create({
        line_items: [
            {
                price: price.id,
                quantity: 1
            }
        ],
        after_completion: {
            type: "hosted_confirmation",
            hosted_confirmation: {
                custom_message: "Thanks for working with WebWorks!"
            }
        }
    });

    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle("WebWorks Payment")
                .setDescription("Thanks for choosing WebWorks! Please pay using one of the payment methods below!")
                .setColor(0x5900ff)
                .addFields(
                    {name: "Stripe", value: `[Pay Now!](${paymentLink.url})`}
                )
                .setTimestamp()
        ]
    });
};

module.exports = {
    CreatePayment
};