function bimmath(tall , fat) {
    let t=tall / 100
    let bmi=fat / (t*t)
    return Math.round(bmi)
}
console.log(bimmath(180,60));

function hi(a) {
    a()()
}

function hey(){
    function inner(){
        console.log("inner!!");
    }
    return inner
}

 hi(hey)