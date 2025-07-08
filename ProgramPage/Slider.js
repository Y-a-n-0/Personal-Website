const carousel = document.getElementById('carousel');
const dotsContainer = document.getElementById('dots');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');

const projects = document.querySelectorAll('.project');
const totalProjects = projects.length;
const projectsPerView = 2;
const totalPages = Math.ceil(totalProjects / projectsPerView);

let currentIndex = 0;

function updateCarousel() {
    const offset = -(currentIndex * 100);
    carousel.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

function goLeft() {
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    updateCarousel();
}

function goRight() {
    currentIndex = (currentIndex + 1) % totalPages;
    updateCarousel();
}

leftBtn.addEventListener('click', goLeft);
rightBtn.addEventListener('click', goRight);

// 初始化
updateCarousel();