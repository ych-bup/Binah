module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send(':ping_pong: Pong: ' + client.ws.ping + 'ms!');
	},
};