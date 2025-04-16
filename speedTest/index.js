let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

let imageApi = "https://picsum.photos/1000/1000?random=";

image.onload = async function () {
    endTime = new Date().getTime();
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });    
};

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = '<span style="color: green;">測試完成</span>';
    } else {
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

const init = async () => {
    info.innerHTML = "測試中...";
    startTime = new Date().getTime();
    image.src = imageApi;
}

window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init()
    }
}