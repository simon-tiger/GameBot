const Discord = require("discord.js");
const calculateXP = level => Math.ceil(((level + 1) ** 1.5) * 10);
function getState(level) {
  if (level < 10) return "Wood";
  if (level < 20) return "Bronze";
  if (level < 30) return "Silver";
  if (level < 40) return "Gold";
  return "Legend";
}
const colors = { Wood: "#A1E5AB", Bronze: "#87644A", Silver: "#808080", Gold: "#FFB30F", Legend: "#FF4E00" };

module.exports = {
  name: "xp",
  description: "Look at your XP and level.",
  execute(message, args) {
    const { players } = message.client;
    const player = players.get(message.author.id);
    const neededXP = calculateXP(player.level);
    const state = getState(player.level);
    const embed = new Discord.MessageEmbed()
      .setTitle("XP")
      .setColor(colors[state])
      .addFields(
        { name: "XP", value: `${player.xp} / ${neededXP}`, inline: true },
        { name: "Level", value: `${player.level} (${state}-level)`, inline: true }
      );
    message.channel.send(embed);
  }
}
