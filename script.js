document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  const submitBtn = document.querySelector('.submit-btn');
  
  // Валидация
  if (!validateEmail(email) && !validatePhone(email)) {
    showError('Некорректный email или телефон');
    document.getElementById('email').classList.add('shake');
    setTimeout(() => document.getElementById('email').classList.remove('shake'), 500);
    return;
  }
  
  if (password.length < 8) {
    showError('Пароль должен содержать минимум 8 символов');
    document.getElementById('password').classList.add('shake');
    setTimeout(() => document.getElementById('password').classList.remove('shake'), 500);
    return;
  }
  
  // Имитация загрузки
  submitBtn.textContent = 'Загрузка...';
  submitBtn.classList.add('loading');
  
  // Проверка данных (хардкод)
  setTimeout(() => {
    if (email === 'user@example.com' && password === 'SecurePass123!') {
      if (remember) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      showSuccess('Успешный вход!');
      createConfetti();
    } else {
      showError('Неверные учетные данные');
    }
    submitBtn.textContent = 'Войти';
    submitBtn.classList.remove('loading');
  }, 1500);
});

// Валидаторы
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

// Сообщения
const showError = (message) => {
  // Удаляем предыдущие сообщения об ошибках
  const oldErrors = document.querySelectorAll('.error-message');
  oldErrors.forEach(error => error.remove());
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // Вставляем сообщение под заголовком формы
  const heading = document.getElementById('login-heading');
  heading.parentNode.insertBefore(errorDiv, heading.nextSibling);
  
  setTimeout(() => {
    errorDiv.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 500);
  }, 3000);
};

const showSuccess = (message) => {
  alert(message); 
};


window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('savedEmail');
  if (savedEmail) {
    document.getElementById('email').value = savedEmail;
    document.getElementById('remember').checked = true;
  }
});

// Пасхалка: конфетти
const createConfetti = () => {
  const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f'];
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.opacity = '1';
    document.body.appendChild(confetti);
    
    // Анимация падения
    confetti.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(720deg)`, opacity: 0 }
      ],
      {
        duration: 3000 + Math.random() * 5000,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
      }
    );
    
    setTimeout(() => confetti.remove(), 8000);
  }
};
