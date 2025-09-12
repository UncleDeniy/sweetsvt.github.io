// mini_app/script.js
let isListening = false;
let audioContext = null;
let analyser = null;
let canvasContext = null;
let animationFrame = null;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initializeVisualizer();
    setupEventListeners();
    
    // Инициализация Telegram Web App
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
});

function initializeVisualizer() {
    const canvas = document.getElementById('audioCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Анимация визуализатора
    animateVisualizer();
}

function setupEventListeners() {
    const micButton = document.getElementById('micButton');
    micButton.addEventListener('click', toggleListening);
}

function toggleListening() {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    isListening = true;
    document.getElementById('micButton').classList.add('listening');
    document.getElementById('micButton').textContent = '● LISTENING';
    document.getElementById('status').textContent = '● LISTENING MODE';
    
    // Здесь будет код для активации голосового ввода
    addChatMessage('system', 'Voice activation enabled. Awaiting keyword...');
    
    // Симуляция работы (в реальном приложении будет Web Audio API)
    simulateListening();
}

function stopListening() {
    isListening = false;
    document.getElementById('micButton').classList.remove('listening');
    document.getElementById('micButton').textContent = '⚡ ACTIVATE';
    document.getElementById('status').textContent = '● SYSTEM READY';
    
    addChatMessage('system', 'Voice activation disabled');
}

function simulateListening() {
    if (!isListening) return;
    
    // Симуляция случайного обнаружения ключевых слов
    setTimeout(() => {
        if (isListening && Math.random() > 0.7) {
            const keywords = ['гладас', 'гладос', 'гладо', 'глас'];
            const detected = keywords[Math.floor(Math.random() * keywords.length)];
            addChatMessage('system', `Keyword detected: "${detected}"`);
            
            // Симуляция ответа
            setTimeout(() => {
                const responses = [
                    "Да, я слушаю. Что вам нужно на этот раз?",
                    "О, снова вы. Ну что там у вас?",
                    "Я здесь. Говорите, только если это действительно важно.",
                    "Приветствую. Надеюсь, у вас есть что-то интересное."
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage('glados', response);
            }, 1000);
        }
        if (isListening) simulateListening();
    }, 2000);
}

function addChatMessage(type, message) {
    const chatLog = document.getElementById('chatLog');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(type + '-message');
    
    const timestamp = new Date().toLocaleTimeString();
    messageElement.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
    
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function animateVisualizer() {
    if (!canvasContext) return;
    
    const canvas = document.getElementById('audioCanvas');
    const width = canvas.width;
    const height = canvas.height;
    
    // Очистка canvas
    canvasContext.fillStyle = '#1a1a22';
    canvasContext.fillRect(0, 0, width, height);
    
    // Рисование визуализатора
    canvasContext.fillStyle = '#ff4444';
    canvasContext.strokeStyle = '#ff4444';
    canvasContext.lineWidth = 2;
    
    canvasContext.beginPath();
    
    const time = Date.now() * 0.002;
    const segments = 50;
    
    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const noise = Math.sin(time + i * 0.1) * 0.5 + 0.5;
        const y = height / 2 + noise * (height / 4) * Math.sin(time * 2 + i * 0.2);
        
        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }
    
    canvasContext.stroke();
    
    animationFrame = requestAnimationFrame(animateVisualizer);
}

// Обработка сообщений от Telegram
Telegram.WebApp.onEvent('viewportChanged', function(e) {
    // Адаптация под изменение размера окна
    const canvas = document.getElementById('audioCanvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// Очистка при закрытии
window.addEventListener('beforeunload', function() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    if (audioContext) {
        audioContext.close();
    }
});
