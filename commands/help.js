const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Get a list of the commands.",
  execute(message, args) {
    const { commands } = message.client;
    const commandNames = ["gamehelp", "help", "play", "register", "rename", "xp"];
    const embed = new Discord.MessageEmbed().setTitle("Commands");
    for (const name of commandNames) {
      const command = commands.get(name);
      embed.addField(`\`>${command.name} ${command.usage || ""}\``, command.description, true);
    }
    embed.addField("`><game>`", "Start a game.", true);
    message.channel.send(embed);
  }
}