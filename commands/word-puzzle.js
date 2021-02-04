const Discord = require("discord.js");
const fs = require("fs");
const words = fs.readFileSync("./1000words.txt", "utf8").split("\n");

function shuffle(l) {
  const list = l.slice();
  const shuffled = [];
  while (list.length > 0) {
    const idx = Math.floor(Math.random() * list.length);
    shuffled.push(list[idx]);
    list.splice(idx, 1);
  }
  return shuffled;
}

module.exports = {
  name: "word-puzzle",
  description: "Solve a number of word scrambles.",
  usage: "[number]",
  execute(message, args) {
    const { players } = message.client;
    const player = players.get(message.author.id);

    const idx = Math.floor(Math.random() * words.length);
    const word = words[idx].split("").filter(x => /\S/.test(x));
    const scramble = shuffle(word).join("");
    const embed = new Discord.MessageEmbed()
      .setTitle("Word Scramble #1")
      .setFooter(`\`${scramble}\``);
    message.channel.send(embed);
    player.game = "Word Puzzle";
    player.turn = 0;
    player.number = parseInt(args[0]);
    player.word = word.join("");
    player.correct = 0;
  }
}
