// 定义食物类
class Food {
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素并赋值给element
    this.element = document.getElementById('food')!;
  }

  // 获取食物的X坐标
  get X() {
    return this.element.offsetLeft;
  }

  // 获取食物的Y坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成一个随机的位置
    // 食物的位置最小是10，最大是290
    // 蛇移动一次就是一格，一格的大小是10，所以要求食物的随机坐标是整10
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + 'px';
    this.element.style.left = left + 'px';
  }
}

export default Food;