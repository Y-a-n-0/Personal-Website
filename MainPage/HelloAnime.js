let isAnimating = false;

const Languages = {
    ch: '你好!',
    en: 'Hello!',
    es: 'Hola!',
    fr: 'Bonjour!',
    de: 'Hallo!',
    it: 'Ciao!',
    ja: 'こんにちは!',
    ko: '안녕하세요!',
    ru: 'Привет!'
};

// 调用时替换 speed 参数为 getRandomSpeed(100)
function getRandomSpeed(baseSpeed) {
  return baseSpeed + Math.random() * 50 - 25; // ±25ms 随机变化
}

function typeWriter(element, text, isDeleting, speed = 100) {
    return new Promise((resolve) => {
      let currentIndex = isDeleting ? text.length : 0;
      
      const interval = setInterval(() => {
        if (isDeleting) {
          currentIndex--;
          element.textContent = text.substring(0, currentIndex);
          if (currentIndex === 0) {
            clearInterval(interval);
            resolve();
          }
        } else {
          currentIndex++;
          element.textContent = text.substring(0, currentIndex);
          if (currentIndex === text.length) {
            clearInterval(interval);
            resolve();
          }
        }
      }, speed);
    });
}


async function ChangeHelloLang(){
    if (isAnimating) return;

    console.log("Changing language...");
    const helloElement = document.getElementById("Hello");


    console.log(helloElement.textContent);

    try {
        isAnimating = true; // 引用全局变量
        
        const currentText = helloElement.textContent.trim();
        const languagesValues = Object.values(Languages);
        const nextText = languagesValues[
            (languagesValues.indexOf(currentText) + 1) % languagesValues.length
        ];

        helloElement.style.width = "fit-content";
        
        // 等待删除动画完成
        await typeWriter(helloElement, currentText, true, getRandomSpeed(100));
        // 等待新文字打印完成
        await typeWriter(helloElement, nextText, false, getRandomSpeed(100));
        
    } catch (error) {
        console.error("Error in animation:", error);
    } finally {
        isAnimating = false; // 确保最终重置状态
    }
}

const intervalID = setInterval(function(){
  ChangeHelloLang();
},3000);