document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('#Nav li');
    const sections = document.querySelectorAll("section");

    // 每次滚动就检测当前页面位置
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(li => {
            li.classList.remove("active");
            const a = li.querySelector("a");
            if (a && a.getAttribute("href") === `#${currentSectionId}`) {
                li.classList.add("active");
            }
        });
    });
});
