const fromCur = document.querySelector(".from .select-input select");
const toCur = document.querySelector(".to .select-input select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector(".reverse");
const amount = document.querySelector(".amount input");
const exRateTxt = document.querySelector(".result");
const apiKey = "400225e6be45451cb35d179c669ffd64";
let Country_List = {
    USD: "US",
    EUR: "EU",
    JPY: "JP",
    TWD: "TW",
    CNY: "CN",
};
window.addEventListener("load", () => {
  if (!fromCur || !toCur) {
    console.error("資料錯誤...");
    console.log("fromCur:", fromCur);
    console.log("toCur:", toCur);
    return;
  }

  [fromCur, toCur].forEach((select, i) => {
    for (let curCode in Country_List) {
      const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "TWD") ? "selected" : "";
      select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
      const code = select.value;
      const imgTag = select.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
  });

  getExchangeRate();
});

async function getExchangeRate() {
  const amountVal = parseFloat(amount.value) || 1;
  exRateTxt.innerText = "換算匯率中...";
  try {
    const response = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&base=${fromCur.value}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    const exchangeRate = result.rates[toCur.value];
    if (!exchangeRate) throw new Error(`Currency ${toCur.value} not supported`);
    const totalExRate = (amountVal * exchangeRate).toFixed(2);
    exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
  } catch (error) {
    console.error("Error:", error);
    exRateTxt.innerText = "資料錯誤...";
  }
}

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (fromCur && toCur) getExchangeRate();
});

exIcon.addEventListener("click", () => {
  if (!fromCur || !toCur) return;
  [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
  [fromCur, toCur].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
  });
  getExchangeRate();
});