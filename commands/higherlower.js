const Discord = require("discord.js");

module.exports = {
  name: "higherlower",
  description: "Play a game of Higher or Lower.",
  execute(message, args) {
    const { players } = message.client;
    const player = players.get(message.author.id);

    const value = Math.floor(Math.random() * 12) + 1;
    const embed = new Discord.MessageEmbed()
      .setTitle("Let's Play Higher or Lower!")
      .addFields(
        { name: "Rules", value: "You get a random number between 1 and 12. You start with 100 points. You need to predict if the next number will be higher or lower, and you will bet a certain amount of points for it. You need to bet at least half the amout of points you already have. If you can do this 7 times and get 200 points, you win!" },
        { name: "Number", value: value, inline: true },
        { name: "Points", value: 100, inline: true }
      );
    message.channel.send(embed);
    player.game = "Higher or Lower";
    player.turn = 0;
    player.value = value;
    player.points = 100;
  }
}
