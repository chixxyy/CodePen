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

// aa


// if (!aa.getAttribute('style')) {
//     aa.addEventListener("mouseover", (event) => {
//         // aa.classList.add('fuck')
//         aa.style.height = "100px";
//         aa.style.background = 'yellow';
//         console.log(4546);
//     });
// }


// aa.addEventListener("mouseover", (event) => {
//     // aa.classList.add('fuck')
//     aa.style.height = "100px";
//     aa.style.background = 'green';
//     console.log(456);
// });




// const qwe = document.querySelector('.fuck')


// if (aa.classList) {

// }


// qwe.addEventListener("mouseover", (event) => {console.log(456);});

// aa.classList.remove('fuck')

// onmouseover = (event) => {};
