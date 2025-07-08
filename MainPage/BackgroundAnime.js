// Scripts.js 或新建文件
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('BackgroundCanvas');
  const ctx = canvas.getContext('2d');
  
  // 调整画布尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 小球配置
  const balls = [];
  const colors = ['#3CFFE2', '#14FFEC', '#10DCCC', '#B3FFF7', '#32FFB8'];
  const blurLevel = 20; // 模糊程度

  // 创建小球
  class Ball {
    constructor() {
      this.radius = Math.random() * 200 + 10;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() * 0.5 - 0.25;
      this.vy = Math.random() * 0.5 - 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      // 创建模糊效果
      ctx.shadowColor = this.color;
      ctx.shadowBlur = blurLevel;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = blurLevel * 3;
      ctx.globalAlpha = 0.3; // 降低透明度
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // 边界检测
      if (this.x < -this.radius) this.x = canvas.width + this.radius;
      if (this.x > canvas.width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = canvas.height + this.radius;
      if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }
  }

  // 初始化小球
  for (let i = 0; i < 15; i++) {
    balls.push(new Ball());
  }

  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
      ball.update();
      ball.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});