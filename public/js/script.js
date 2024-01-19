console.log('JS: Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const textOne = document.querySelector('#textOne');
const textTwo = document.querySelector('#textTwo');


weatherForm.addEventListener('submit', (e) => {
 e.preventDefault();
 const location = search.value;


 // Check if the location is empty
 if (!location) {
  textOne.textContent = "Please enter a valid Postal Code";
  textTwo.textContent = "";
  return; // Exit the function early if the location is empty
 }

 textOne.textContent = "Loading..."
 textTwo.textContent = "";

 fetch("weather?zip=" + location).then((response) => {
  response.json().then((result) => {

   if (result.err) {
    textOne.textContent = result.err;
   } else {
    textOne.textContent = result.data;
    textTwo.textContent = 'We appreciate your visit!';
   }
  })
 })
})