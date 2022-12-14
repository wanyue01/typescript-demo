// 定义表示记分牌的类
export default class ScorePanel {
  score = 0;
  level = 1;
  scoreElement: HTMLElement;
  levelElement: HTMLElement;
  maxLevel: number;
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 加分
  addScore() {
    this.scoreElement.innerHTML = ++this.score + '';
    if (this.level % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提高等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelElement.innerHTML = ++this.level + '';
    }
  }
}