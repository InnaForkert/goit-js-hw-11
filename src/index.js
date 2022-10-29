const API_key = '30945884-5d04be7201908102dc9a782a9';
const url = `https://pixabay.com/api/?key=${API_key}&q=${API_key}&image_type=photo&orientation=horizontal&safesearch=true`;

const form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
}
