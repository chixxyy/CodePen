const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");
const countries = {
  "am-ET": "阿姆哈拉語",
  "ar-SA": "阿拉伯語",
  "be-BY": "白俄羅斯語",
  "bem-ZM": "本巴語",
  "bi-VU": "比斯拉馬語",
  "bjs-BB": "巴貝多語",
  "bn-IN": "孟加拉語",
  "bo-CN": "藏語",
  "br-FR": "布列塔尼語",
  "bs-BA": "波斯尼亞語",
  "ca-ES": "加泰羅尼亞語",
  "cop-EG": "科普特語",
  "cs-CZ": "捷克語",
  "cy-GB": "威爾士語",
  "da-DK": "丹麥語",
  "dz-BT": "宗喀語",
  "de-DE": "德語",
  "dv-MV": "馬爾代夫語",
  "el-GR": "希臘語",
  "en-GB": "英語",
  "es-ES": "西班牙語",
  "et-EE": "愛沙尼亞語",
  "eu-ES": "巴斯克語",
  "fa-IR": "波斯語",
  "fi-FI": "芬蘭語",
  "fn-FNG": "凡加羅語",
  "fo-FO": "法羅語",
  "fr-FR": "法語",
  "gl-ES": "加利西亞語",
  "gu-IN": "古吉拉特語",
  "ha-NE": "豪薩語",
  "he-IL": "希伯來語",
  "hi-IN": "印地語",
  "hr-HR": "克羅地亞語",
  "hu-HU": "匈牙利語",
  "id-ID": "印度尼西亞語",
  "is-IS": "冰島語",
  "it-IT": "意大利語",
  "ja-JP": "日語",
  "kk-KZ": "哈薩克語",
  "km-KM": "高棉語",
  "kn-IN": "坎納達語",
  "ko-KR": "韓語",
  "ku-TR": "庫爾德語",
  "ky-KG": "吉爾吉斯語",
  "la-VA": "拉丁語",
  "lo-LA": "寮語",
  "lv-LV": "拉脫維亞語",
  "men-SL": "門德語",
  "mg-MG": "馬拉加西語",
  "mi-NZ": "毛利語",
  "ms-MY": "馬來語",
  "mt-MT": "馬耳他語",
  "my-MM": "緬甸語",
  "ne-NP": "尼泊爾語",
  "niu-NU": "紐埃語",
  "nl-NL": "荷蘭語",
  "no-NO": "挪威語",
  "ny-MW": "齊切瓦語",
  "ur-PK": "烏爾都語",
  "pau-PW": "帕勞語",
  "pa-IN": "旁遮普語",
  "ps-PK": "普什圖語",
  "pis-SB": "比津語",
  "pl-PL": "波蘭語",
  "pt-PT": "葡萄牙語",
  "rn-BI": "基隆迪語",
  "ro-RO": "羅馬尼亞語",
  "ru-RU": "俄語",
  "sg-CF": "桑戈語",
  "si-LK": "僧伽羅語",
  "sk-SK": "斯洛伐克語",
  "sm-WS": "薩摩亞語",
  "sn-ZW": "紹納語",
  "so-SO": "索馬里語",
  "sq-AL": "阿爾巴尼亞語",
  "sr-RS": "塞爾維亞語",
  "sv-SE": "瑞典語",
  "sw-SZ": "斯瓦希里語",
  "ta-LK": "泰米爾語",
  "te-IN": "泰盧固語",
  "tet-TL": "德頓語",
  "tg-TJ": "塔吉克語",
  "th-TH": "泰語",
  "ti-TI": "提格利尼亞語",
  "tk-TM": "土庫曼語",
  "tl-PH": "塔加洛語",
  "tn-BW": "茨瓦納語",
  "to-TO": "湯加語",
  "tr-TR": "土耳其語",
  "uk-UA": "烏克蘭語",
  "uz-UZ": "烏茲別克語",
  "vi-VN": "越南語",
  "wo-SN": "沃洛夫語",
  "xh-ZA": "科薩語",
  "yi-YD": "意第緒語",
  "zu-ZA": "祖魯語",
  "zh-TW": "繁體中文",
  "zh-CN": "簡體中文",
};

selectTag.forEach((tag, id) => {
  for (let country_code in countries) {
    let selected =
      id == 0
        ? country_code == "en-GB"
          ? "selected"
          : ""
        : country_code == "zh-TW"
        ? "selected"
        : "";
    let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchageIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if (!text) return;
  toText.setAttribute("placeholder", "翻譯中...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          toText.value = data.translation;
        }
      });
      toText.setAttribute("placeholder", "翻譯中...");
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
