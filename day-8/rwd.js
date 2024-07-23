const car = document.querySelector('.container')
const image = car.querySelector('card')
let curr = 0;

setInterval(() => {
    image[curr].style.display ='none'
    curr = (curr + 1) % image.length;
    image[curr].style.display ='block';
},3000);