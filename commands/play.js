const Discord = require("discord.js");
const increaseXP = require("../increaseXP.js");
const fs = require("fs");

const games = new Discord.Collection();

const gameFiles = fs.readdirSync("./commands/games").filter(file => file.endsWith(".js"));
for (const file of gameFiles) {
  const game = require(`./games/${file}`);
  games.set(game.name, game);
}

module.exports = {
  name: "play",
  description: "Make a move in a game.",
  usage: "<args>",
  execute(message, args) {
    const { players } = message.client;
    const player = players.get(message.author.id);

    if (!games.has(player.game)) return;

    const game = games.get(player.game);
    const winStatus = game.move(message, args, player);
    if (winStatus == "win") {
      increaseXP(player, game.reward);
      player.game = "none";
    } else if (winStatus == "loss") {
      player.game = "none";
    }
  }
}
