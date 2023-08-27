export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
  }

  init() {
    alert(`
      Игра началась!
      Для победы нужно убить 10 Гоблинов.
      5 промахов - и Вы проиграли!
      `);
    this.gamePlay.drawUi();
    this.gamePlay.getRandomHole();
  }
}
