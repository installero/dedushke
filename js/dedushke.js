document.addEventListener("DOMContentLoaded", ready);

function ready() {
  fetch('template.txt')
    .then((response) => response.text())
    .then((text) => bind(text));
}

function bind(template) {
  document
    .querySelector('input[type="submit"]')
    .addEventListener('click', (click_event) => {
      click_event.preventDefault();
      document.getElementById('text').innerHTML = generateText(template);
    });
}

function generateText(template) {
  let text = template;

  document
    .getElementById('form')
    .querySelectorAll('input, select, textarea')
    .forEach((input) => {
      console.log(input.name);

      if(input.type != 'submit') {
        text = text.replace('{{' + input.name + '}}', input.value);
      }

      console.log(text);
    });

  return text.asPattern().toString();
}
