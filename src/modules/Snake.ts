export default class Snake {
  // 蛇头元素
  head: HTMLElement;
  // 蛇身
  body: HTMLCollection;
  // 蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!;
    this.body = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头坐标
  set X(value: number) {
    if (this.X === value) return;

    if (value < 0 || value > 290) throw new Error('蛇撞墙了');

    // 阻止蛇掉头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) value = this.X - 10;
      else value = this.X + 10;
    }

    this.moveBody();

    this.head.style.left = value + 'px';

    this.checkCrash();
  }

  set Y(value: number) {
    if (this.Y === value) return;

    if (value < 0 || value > 290) throw new Error('蛇撞墙了');

    // 阻止蛇掉头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) value = this.Y - 10;
      else value = this.Y + 10;
    }

    this.moveBody();

    this.head.style.top = value + 'px';

    this.checkCrash();

  }

  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 蛇身移动
  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      // 获取前一节的位置
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;

      // 给当前节身赋值
      (this.body[i] as HTMLElement).style.left = X + 'px';
      (this.body[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检测蛇头有无撞蛇身
  checkCrash() {
    for (let i = 1; i < this.body.length; i++) {
      if ((this.body[i] as HTMLElement).offsetLeft === this.X && (this.body[i] as HTMLElement).offsetTop === this.Y) {
        throw new Error('哎呀呀撞到自己了~')
      }
    }
  }
}