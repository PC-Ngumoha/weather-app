'use strict';
/**
 * Client-side javascript
 *
 * Helps us fetch data from the weather API and display them on the page.
 */

// const headers = {
//   'Access-Control-Allow-Origin': '*'
// };

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (event) => {
  const address = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageTwo.textContent = data.forecast;
        messageOne.textContent = data.location;
      }
    });
  event.preventDefault();
});
