const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') {
        return;
    } else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', '我是個聊天機器人');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }, 2000);
    return;
}
appendMessage('user', message);
userInput.value = '';

const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '668afa06aamsh03468ec085837f5p137741jsna721deb26474',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        messages: [
            {
                role: 'user',
                content: 'hello'
            }
        ],
        web_access: false
    })
};

fetch('https://chatgpt-42.p.rapidapi.com/chatgpt', options)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`錯誤: ${response.status}`);
        }
        return response.json();
    })
    .then((response) => {
        appendMessage('bot', response.result);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    })
    .catch((err) => {
        console.error('發生錯誤:', err);

        appendMessage('bot', `錯誤: ${err.message}`);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    });
}

function appendMessage(sender, message) {
    info.computedStyleMap.display = "none";
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }
    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    
}
