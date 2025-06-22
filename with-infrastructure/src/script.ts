// Явно типизированные элементы
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const rememberCheckbox = document.getElementById('remember') as HTMLInputElement;
const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement;

// Обработчик формы
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const remember = rememberCheckbox.checked;
  
  // Валидация
  if (!validateEmail(email) && !validatePhone(email)) {
    showError('Некорректный email или телефон');
    emailInput.classList.add('shake');
    setTimeout(() => emailInput.classList.remove('shake'), 500);
    return;
  }
  
  if (password.length < 8) {
    showError('Пароль должен содержать минимум 8 символов');
    passwordInput.classList.add('shake');
    setTimeout(() => passwordInput.classList.remove('shake'), 500);
    return;
  }
  
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
export const validateEmail = (email: string): boolean => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone: string): boolean => 
  /^\+7\d{10}$/.test(phone);

// Сообщения
const showError = (message: string): void => {
  const oldErrors = document.querySelectorAll('.error-message');
  oldErrors.forEach(error => error.remove());
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  const heading = document.getElementById('login-heading');
  if (heading && heading.parentNode) {
    heading.parentNode.insertBefore(errorDiv, heading.nextSibling);
  }
  
  setTimeout(() => {
    errorDiv.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 500);
  }, 3000);
};

const showSuccess = (message: string): void => {
  alert(message);
};

// Восстановление сохраненного email
window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('savedEmail');
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
  }
});

// Конфетти
export const createConfetti = (): void => {
  if (!document.body) return;
  
  const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f'];
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.opacity = '1';
    document.body.appendChild(confetti);
    
    // Анимация
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
    
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 8000);
  }
};