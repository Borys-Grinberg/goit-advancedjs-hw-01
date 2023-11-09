import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Функція для збереження стану форми в локальному сховищі
function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження стану форми з локального сховища
function loadFormState() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

// Викликаємо функцію для завантаження стану форми при завантаженні сторінки
loadFormState();

// Використовуємо throttle для обмеження збереження даних у локальному сховищі
form.addEventListener('input', throttle(saveFormState, 500));

// Обробник події сабміту форми
form.addEventListener('submit', e => {
  e.preventDefault();

  // Отримуємо дані форми і виводимо їх у консоль
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);

  // Очищаємо дані форми та локальне сховище
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});
