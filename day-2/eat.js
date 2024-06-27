function printChristmasTree(height) {
    for (let i = 0; i < height; i++) {
        let str = '';
        for (let j = 0; j < height - i - 1; j++) {
            str += ' '; // 在每行的前面添加空格
        }
        for (let k = 0; k < 2 * i + 1; k++) {
            str += '*'; // 在每行的中間添加星號
        }
        console.log(str); // 打印每行
    }

    // 打印樹幹
    for (let i = 0; i < 2; i++) {
        let trunk = '';
        for (let j = 0; j < height - 1; j++) {
            trunk += ' '; // 在樹幹前面添加空格
        }
        trunk += '*'; // 樹幹的星號
        console.log(trunk);
    }
}

// 調用函數並指定聖誕樹的高度
printChristmasTree(7);

