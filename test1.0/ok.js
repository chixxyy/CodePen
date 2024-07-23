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
        }, 3000); 
        
        //  RWD
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const menuIconSrc = 'https://www.svgrepo.com/show/350240/bars.svg';
            const closeIconSrc = 'https://www.svgrepo.com/show/499592/close-x.svg';
        
            dropdownToggle.addEventListener('click', function(event) {
                event.preventDefault();
                dropdownMenu.classList.toggle('show');
        
                if (dropdownMenu.classList.contains('show')) {
                    dropdownToggle.src = closeIconSrc;
                } else {
                    dropdownToggle.src = menuIconSrc;
                }
            });
        
            window.addEventListener('click', function(event) {
                if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
                    if (dropdownMenu.classList.contains('show')) {
                        dropdownMenu.classList.remove('show');
                        dropdownToggle.src = menuIconSrc;
                    }
                }
            });
        
            document.querySelectorAll('.downbox').forEach(function(downbox) {
                downbox.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const downul = this.querySelector('.downul');
                    if (downul) {
                        downul.style.display = (downul.style.display === 'block') ? 'none' : 'block';
                        this.classList.toggle('hide-arrow');
                    }
                });
            });
        });