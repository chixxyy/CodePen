const aa = document.querySelectorAll('.box')

aa.forEach((box) => {
    box.addEventListener("mouseover", (event) => {

        box.classList.toggle('xx')    
        if (box.classList.contains('xx')) {
            box.style.height = "200px";
            box.style.background = 'yellow';
            box.style.color = 'red';
            box.style.transition = 'all 1s 0s';
        } else {
            box.style.height = "100px";
            box.style.color='black'
            box.style.background = 'green';
        }
    });
})