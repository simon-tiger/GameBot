const calculateXP = level => Math.ceil(((level + 1) ** 1.5) * 10);

module.exports = (player, amount) => {
  let neededXP = calculateXP(player.level);
  player.xp += amount;
  while (player.xp >= neededXP) {
    player.xp -= neededXP;
    player.level++;
    neededXP = calculateXP(player.level);
  }
}
