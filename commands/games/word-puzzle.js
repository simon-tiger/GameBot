const Discord = require("discord.js");
const fs = require("fs");
const words = fs.readFileSync("./1000words.txt", "utf8").split("\n");

function winEmbed(correct) {
  return new Discord.MessageEmbed()
    .setTitle("You win! :grin:")
    .setFooter(`Congratulations, you won with ${correct} puzzles solved correctly!`);
}

function lossEmbed(quit, correct, needed) {
  return new Discord.MessageEmbed()
    .setTitle("You lose :frowning2:")
    .setFooter(quit ? "You have quit" : `You've only got ${correct} puzzles correct...you had to solve at least ${needed} to win`);
}

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
  name: "Word Puzzle",
  commandName: "word-puzzle",
  rules: "A word scramble consists of a few letters, where if you put them in the right order, you get a word. Your goal is to guess the word. You get to decide how many word scrambles to solve. If you get at least 75% right, you will win!",
  instructions: "<word> | quit",
  reward: 100,
  move(message, args, player) {
    const word = args[0].toLowerCase();
    let embed;
    let outcome = false;
    if (word === "quit") {
      embed = lossEmbed(true);
      return "loss";
    } else {
      const idx = Math.floor(Math.random() * words.length);
      const newWord = words[idx].split("").filter(x => /\S/.test(x));
      const newScramble = shuffle(newWord).join("");
      player.turn++;
      embed = new Discord.MessageEmbed()
        .addField(`Next Word Scramble (#${player.turn+1})`, `\`${newScramble}\``, true);
      if (word === player.word) {
        embed.setTitle("Correct! :white_check_mark:");
        player.correct++;
      } else {
        embed.setTitle("Wrong :x:");
        embed.addField("Correct Answer", player.word, true);
      }
      player.word = newWord.join("");
      if (player.turn >= player.number) {
        outcome = true;
      }
    }
    message.channel.send(embed);
    if (outcome) {
      if (player.correct >= 0.75 * player.number) {
        message.channel.send(winEmbed(player.correct));
        return "win";
      } else {
        message.channel.send(lossEmbed(false, player.correct, Math.ceil(0.75 * player.number)));
        return "loss";
      }
    }
  }
}
