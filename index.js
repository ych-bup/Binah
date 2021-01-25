const Discord = require("discord.js")
var fs = require('fs')

var obj = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const Client = new Discord.Client()
Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	Client.commands.set(command.name, command);
}

const prefix = "b?"

Client.on("ready", async() => {
    console.log("Logged in as " + Client.user.tag + "!")
});

Client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!Client.commands.has(command)) return;

    try {
        Client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

global.client = Client

Client.login(obj.token)