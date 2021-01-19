const Discord = require("discord.js");
const Client = new Discord.Client();

const prefix = "b?";

Client.on("ready", async() => {
    console.log("We logged in as " + Client.user.tag + "!");
});

Client.login()