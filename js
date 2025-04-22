// إنشاء اتصال WebSocket
const socket = new WebSocket('ws://localhost:8080');

// عناصر DOM
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// إرسال الرسالة عند النقر على الزر
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // إرسال الرسالة عبر WebSocket
        socket.send(message);
        // إضافة الرسالة إلى واجهة المستخدم كرسالة خاصة بالمستخدم
        addMessage(message, 'user');
        // مسح مربع الإدخال
        messageInput.value = '';
    }
}

// استقبال الرسائل من الخادم
socket.onmessage = (event) => {
    const message = event.data;
    addMessage(message, 'other');
};

// إضافة رسالة إلى واجهة المستخدم
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', `message-${sender}`);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // التمرير التلقائي
}

// عند فتح الاتصال
socket.onopen = () => {
    console.log('تم الاتصال بالخادم.');
};

// عند حدوث خطأ
socket.onerror = (error) => {
    console.error('حدث خطأ:', error);
};
