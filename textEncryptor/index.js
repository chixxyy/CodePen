const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function encryptText(text, key) {
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (textIndex === -1) {
            encryptText += textChar;
        } else {
            const newIndex = (textIndex + keyIndex) % alphabet.length;
            encryptedText += alphabet[newIndex];
        }
    }

    return encryptedText;
}

function decryptText(encryptedText, key) {
    let decryptedText = '';

    for (let i = 0; i < encryptedText.length; i++) {
        const textChar = encryptedText[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (textIndex === -1) {
            decryptedText += textChar;
        } else {
            const newIndex = (textIndex - keyIndex + alphabet.length) % alphabet.length;
            decryptedText += alphabet[newIndex];
        }
    }
    return decryptedText;
}

function updateResult(isEncrypting) {
    const text = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    let result = '';

    if (isEncrypting) {
        result = encryptText(text, key);
    } else {
        result = decryptText(text, key);
    }
    document.getElementById('result').innerText = result;
}

document.getElementById('enc-btn').addEventListener('click', function () {
    updateResult(true);
});

document.getElementById('dec-btn').addEventListener('click', function () {
    updateResult(false);
})

document.addEventListener('DOMContentLoaded', () => {
    updateResult(true);
})