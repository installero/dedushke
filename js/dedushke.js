document.addEventListener("DOMContentLoaded", ready);

function ready() {
  fetch(templatePath)
    .then((response) => response.text())
    .then((text) => {
      document.getElementById('template').innerHTML = text;
      bind();
    });
}

function bind() {
  // Bind text generation to submit button
  document
    .querySelector('input[type="submit"]')
    .addEventListener('click', (click_event) => {
      click_event.preventDefault();
      var template = document.getElementById('template').value;
      document.getElementById('text').innerHTML = generateText(template);
    });

  // Copy generated text on 'Copy' button click
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
