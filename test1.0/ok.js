let currentIndex = 0;

        function showSlide(index) {
            const slides = document.querySelectorAll('.carousel-item');
            const totalSlides = slides.length;

            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100;
            document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        }

        function moveSlide(direction) {
            showSlide(currentIndex + direction);
        }

        // 自動播放輪播圖片
        setInterval(() => {
            moveSlide(1);
        }, 3000); // 每3秒切換一次