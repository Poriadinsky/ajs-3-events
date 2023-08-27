export default class GamePlay {
  constructor() {
    this.holesCount = 16;
    this.luckCount = 0;
    this.lostCount = 0;
  }

  drawUi() {
    const card = document.querySelector('.card');

    const statistic = document.createElement('div');
    card.appendChild(statistic);
    statistic.classList.add('statistic');
    statistic.innerHTML = 'Попаданий: <span class="luck">0</span><br>Промахов: <span class="lost">0</span><br>';

    const holeList = document.createElement('div');
    card.appendChild(holeList);
    holeList.classList.add('hole-list');

    for (let i = 0; i < this.holesCount; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      holeList.appendChild(hole);
    }
  }

  getRandomHole() {
    const holeList = document.querySelector('.hole-list');
    this.holes = Array.from(document.querySelectorAll('.hole'));
    this.luck = document.querySelector('.luck');
    this.lost = document.querySelector('.lost');

    const getRandom = () => Math.floor(1 + Math.random() * (this.holesCount - 1));

    let lastTarget = getRandom();

    const removeActiveByIndex = (index) => this.holes[index].classList.remove('active-hole');
    const appendActiveByIndex = (index) => this.holes[index].classList.add('active-hole');

    const intervalHandler = () => {
      removeActiveByIndex(lastTarget);
      lastTarget = getRandom();
      appendActiveByIndex(lastTarget);
      this.timeout = setTimeout(intervalHandler, 1000);
    };

    this.timeout = setTimeout(intervalHandler, 1000);

    holeList.addEventListener('click', ({ target }) => {
      if (target.classList.contains('active-hole')) {
        removeActiveByIndex(lastTarget);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(intervalHandler, 1000);
        this.luckCount++;
        this.luck.textContent = this.luckCount;
        this.checkWin();
      } else {
        this.lostCount++;
        this.lost.textContent = this.lostCount;
        this.checkWin();
      }
    });
  }

  stop() {
    clearTimeout(this.timeout);
  }

  // eslint-disable-next-line
  createMessage(text) {
    const body = document.querySelector('body');
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = text;
    body.appendChild(message);

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times;';
    message.appendChild(close);

    const background = document.createElement('div');
    background.classList.add('background');
    body.appendChild(background);

    document.querySelector('.close').addEventListener('click', () => {
      // eslint-disable-next-line
      location.reload();
    });
  }

  checkWin() {
    if (this.luckCount === 10) {
      this.stop();
      this.holes.forEach((el) => {
        el.classList.remove('active-hole');
      });
      const text = `Победа! Набрано баллов: ${this.luckCount}.`;
      this.createMessage(text);
    }

    if (this.lostCount === 5) {
      this.stop();
      this.holes.forEach((el) => {
        el.classList.remove('active-hole');
      });
      const text = `Вы проиграли. Допущено промахов: ${this.lostCount}.`;
      this.createMessage(text);
    }
  }
}
