// function bimmath(tall , fat) {
//     let t=tall / 100
//     let bmi=fat / (t*t)
//     return Math.round(bmi)
// }
// console.log(bimmath(180,60));

// function hi(a) {
//     a()()
// }

// function hey(){
//     function inner(){
//         console.log("inner!!");
//     }
//     return inner
// }

//  hi(hey)

const list = [1, 2, 3, 4, 5]
const newList = []

const double = (x) => {return x * 2}
const newArray = list.map(double)
const result = list.reduce(function(acc , cv){
    return acc + cv
})
console.log(result);

for (let i = 0;i < 4;i ++){
    const value = list[i]*2
    newList.push(value)
}

console.log(list);
console.log(newList);
console.log(newArray);