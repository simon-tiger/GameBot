const Discord = require("discord.js");

module.exports = {
  name: "register",
  description: "Register to play games. You must execute this command before you play anything.",
  usage: "[name]",
  execute(message, args) {
    const { players } = message.client;
    if (players.has(message.author.id)) {
      const { name } = players.get(message.author.id);
      const embed = new Discord.MessageEmbed()
        .setTitle("You're already registered")
        .setFooter(`Why would you register again ${name}? Anyway, if you just want to rename yourself, you can type \`>rename <name>\`.`);
      return message.channel.send(embed);
    }
    const name = args[0] || message.author.username;
    players.set(message.author.id, {
      name: name,
      id: message.author.id,
      xp: 0,
      level: 1,
      game: "none"
    });
    const embed = new Discord.MessageEmbed()
      .setTitle("You are registered!")
      .setFooter(`You are registered as ${name}`);
    message.channel.send(embed);
  }
}
