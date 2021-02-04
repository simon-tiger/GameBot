const Discord = require("discord.js");

function winEmbed(points) {
  return new Discord.MessageEmbed()
    .setTitle("You win! :grin:")
    .setFooter(`Congratulations, you won with ${points} points!`);
}

function lossEmbed(points) {
  return new Discord.MessageEmbed()
    .setTitle("You lose :frowning2:")
    .setFooter(points == 0 ? "You lost all your points!" : `You only have ${points} points`);
}

function randomOtherThan(num) {
  let rand = Math.floor(Math.random() * 12) + 1;
  while (rand == num) {
    rand = Math.floor(Math.random() * 12) + 1;
  }
  return rand;
}

module.exports = {
  name: "Higher or Lower",
  commandName: "higherlower",
  rules: "You get a random number between 1 and 12. You start with 100 points. You need to predict if the next number will be higher or lower, and you will bet a certain amount of points for it. You need to bet at least half the amout of points you already have. If you can do this 7 times and get 200 points, you win!",
  instructions: "<prerdiction> <bet>",
  reward: 50,
  move(message, args, player) {
    const comparison = args[0];
    const bet = parseInt(args[1]);
    const { value, points } = player;
    let newValue = randomOtherThan(value);
    const embed = new Discord.MessageEmbed();
    let played = false;
    if (bet < points/2) {
      embed.setTitle("Nupnup :unamused:")
        .setFooter(`You have to bet at least ${points/2} points ${message.author.username}!`);
    } else if (bet > points) {
      embed.setTitle("Nupnup :unamused:")
        .setFooter(`Don't risk more than all your points ${message.author.username}!`)
    } else if (comparison != "Higher" && newValue > value || comparison != "Lower" && newValue < value || newValue == value) {
      played = true;
      embed.setTitle("Wrong :x:")
        .addFields(
          { name: "Number", value: newValue, inline: true },
          { name: "Points", value: points - bet, inline: true }
        );
      player.value = newValue;
      player.points = points - bet;
    } else {
      played = true;
      embed.setTitle("Correct! :white_check_mark:")
        .addFields(
          { name: "Number", value: newValue, inline: true },
          { name: "Points", value: points + bet, inline: true }
        );
      player.value = newValue;
      player.points = points + bet;
    }
    message.channel.send(embed);
    if (played) {
      player.turn++;
      while (player.value == 1 || player.value == 12) {
        player.value = randomOtherThan(player.value);
        message.channel.send(new Discord.MessageEmbed()
          .addFields(
            { name: "Number", value: player.value, inline: true },
            { name: "Points", value: player.points, inline: true }
          ));
      }
      if (player.turn == 7 || player.points <= 0) {
        if (player.points >= 200) {
          message.channel.send(winEmbed(player.points));
          return "win";
        } else {
          message.channel.send(lossEmbed(player.points));
          return "loss";
        }
      }
    }
    return "none";
  }
}
