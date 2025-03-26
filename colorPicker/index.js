const pickerBtn = document.querySelector("#picker-btn");
const clearBtn = document.querySelector("#clear-btn");
const colorList = document.querySelector(".all-colors");
const exportBtn = document.querySelector("#export-btn");

let pickedColors = JSON.parse(localStorage.getItem("colors-list")) || [];

let currentPopup = null;

const copyToClipboard = async (text, element) => {
    try {
        await navigator.clipboard.writeText(text);
        element.innerText = "已複製";
        setTimeout(() => {
            element.innerText = text;
        }, 1000);
    } catch (error) {
        alert("已複製到檔案");
    }
};

const exportColors = () => {
    const colorText = pickedColors.join("\n");
    const blob = new Blob([colorText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Colors.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const createColorPopup = (color) => {
    const popup = document.createElement("div");
    popup.classList.add("color-popup");
    popup.innerHTML = `
        <div class="color-popup-content">
            <span class="close-popup">x</span>
            <div class="color-info">
                <div class="color-preview" style="background: ${color};"></div>
                <div class="color-details">
                    <div class="color-value">
                        <span class="label">HEX:</span>
                        <span class="value hex" data-color="${color}">${color}</span>
                    </div>
                    <div class="color-value">
                        <span class="label">RGB:</span>
                        <span class="value rgb" data-color="${color}">${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const closePopup = popup.querySelector(".close-popup");
    closePopup.addEventListener('click', () => {
        document.body.removeChild(popup);
        currentPopup = null;
    });

    const colorValues = popup.querySelectorAll(".value");
    colorValues.forEach((value) => {
        value.addEventListener('click', (e) => {
            const text = e.currentTarget.innerText;
            copyToClipboard(text, e.currentTarget);
        });
    });

    return popup;
};

const showColors = () => {
    colorList.innerHTML = pickedColors.map((color) =>
        `
            <li class="color">
                <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc" : color}"></span>
                <span class="value hex" data-color="${color}">${color}</span>
            </li>
        `
    ).join("");

    const colorElements = document.querySelectorAll(".color");
    colorElements.forEach((li) => {
        const colorHex = li.querySelector(".value.hex");
        colorHex.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            if (currentPopup) {
                document.body.removeChild(currentPopup);
            }
            const popup = createColorPopup(color);
            document.body.appendChild(popup);
            currentPopup = popup;
        });
    });

    const pickedColorsContainer = document.querySelector(".colors-list");
    pickedColorsContainer.classList.toggle("hide", pickedColors.length === 0);
};

const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

const activateEyeDropper = async () => {
    document.body.style.display = "none";
    try {
        const { sRGBHex } = await new EyeDropper().open();

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("colors-list", JSON.stringify(pickedColors));
        }

        showColors();
    } catch (error) {
        alert("請提交顏色代碼");
    } finally {
        document.body.style.display = "block";
    }
};

const clearAllColors = () => {
    pickedColors = [];
    localStorage.removeItem("colors-list");
    showColors();
};

clearBtn.addEventListener('click', clearAllColors);
pickerBtn.addEventListener('click', activateEyeDropper);
exportBtn.addEventListener('click', exportColors);

showColors();