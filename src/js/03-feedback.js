import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const LS_KEY = 'feedback-form-state';

loadFormData();

function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value
  };
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = JSON.parse(localStorage.getItem(LS_KEY));
  if (savedData) {
    emailInput.value = savedData.email;
    messageTextarea.value = savedData.message;
  }
}

const throttledSaveFormData = throttle(saveFormData, 500);

form.addEventListener('input', throttledSaveFormData);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log({
    email: emailInput.value,
    message: messageTextarea.value
  });

  localStorage.removeItem(LS_KEY);
  form.reset();
});
