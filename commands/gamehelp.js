const Discord = require("discord.js");
const fs = require("fs");

const games = new Discord.Collection();

const gameFiles = fs.readdirSync("./commands/games").filter(file => file.endsWith(".js"));
for (const file of gameFiles) {
  const game = require(`./games/${file}`);
  games.set(game.name, game);
}

module.exports = {
  name: "gamehelp",
  description: "Get a list of the games.",
  execute(message, args) {
    if (args[0]) {
      const game = games.get(args.join(" "));
      const embed = new Discord.MessageEmbed()
        .setTitle(game.name)
        .addFields(
          { name: "Command Name", value: game.commandName, inline: true },
          { name: "Rules", value: game.rules },
          { name: "Instructions", value: `\`>play ${game.instructions}\``, inline: true },
          { name: "Reward", value: game.reward, inline: true }
        );
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed().setTitle("Games");
      embed.setFooter(games.map(x => x.name).join(", "));
      message.channel.send(embed);
    }
  }
}