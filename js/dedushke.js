document.addEventListener("DOMContentLoaded", ready);

function ready() {
  fetch(templatePath)
    .then((response) => response.text())
    .then((text) => bind(text));
}

function bind(template) {
  // Print template to template example textarea
  document.getElementById('template').innerHTML = template;

  // Bind text generation to submit button
  document
    .querySelector('input[type="submit"]')
    .addEventListener('click', (click_event) => {
      click_event.preventDefault();
      document.getElementById('text').innerHTML = generateText(template);
    });

  // Click on 'Copy' button copies text to clipboard.
  let text = document.getElementById('text');
  document
    .getElementById('copy')
    .addEventListener('click', (click_event) => {
      text.select();
      document.execCommand('copy');
    });
}

function generateText(template) {
  let text = template;

  document
    .getElementById('form')
    .querySelectorAll('input, select, textarea')
    .forEach((input) => {
      if(input.type != 'submit') {
        text = text.replace('{{' + input.name + '}}', input.value);
      }
    });

  return text.asPattern().toString();
}
