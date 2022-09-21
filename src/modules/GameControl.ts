import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏控制器
export default class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = '';
  isLive: Boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  // 游戏的初始化方法，调用后游戏开始
  init() {
    // 绑定键盘按下事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run();
  }

  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.code;

  }

  // 创建一个控制蛇移动的方法
  run() {
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message + 'GAME OVER!');
      this.isLive = false;
    }

    this.checkEat(X, Y);

    this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1) * 30);
  }

  // 检测是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 分数增加
      this.scorePanel.addScore();
      // 食物重置
      this.food.change();
      // 蛇身增长
      this.snake.addBody();
    }
  }
}