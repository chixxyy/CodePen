emailjs.init("omi1y9tvx7EeCXTqS"); 

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

function sendEmail() {    
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    
    emailjs.send("service_d3fhx62", "template_qrzikri", {
        to_email: to,
        subject: subject,
        message: message
    })
        .then(function () {
            result.innerHTML = "Email 發送成功";
            result.style.opacity = 1;
        }, function (error) {
            result.innerHTML = "Email 發送失敗";
            result.style.opacity = 1;
        });
}