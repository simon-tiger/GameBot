const Discord = require("discord.js");

module.exports = {
  name: "rename",
  description: "Rename yourself.",
  usage: "<name>",
  execute(message, args) {
    const { players } = message.client;
    const player = players.get(message.author.id);
    player.name = args[0];
    const embed = new Discord.MessageEmbed()
      .setTitle("Rename successful!")
      .setFooter(`You are renamed to ${args[0]}`);
    message.channel.send(embed);
  }
}
