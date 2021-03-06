const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.search__button');
const container = document.querySelector('.section');
const emptyMsg = document.getElementById('emptyMsg');


const cleardate = (myNode) => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};


const showResults = (result) => {
  cleardate(container);
  const resultLength = result.articles.length;
  for (let i = 0; i < resultLength; i++) {
    const articleRes = document.createElement('article');
    const imgArt = document.createElement('img');
    const content = document.createElement('div');
    const title = document.createElement('h2');
    const desc = document.createElement('p');
    const linkDetails = document.createElement('a');
    const author = document.createElement('p');

    title.textContent = result.articles[i].title;
    desc.textContent = result.articles[i].description;
    imgArt.src = result.articles[i].urlToImage;
    imgArt.alt = 'article image';
    linkDetails.textContent = 'For more Details';
    linkDetails.href = result.articles[i].url;
    linkDetails.target = 'blank';
    author.textContent = `Author: ${result.articles[i].author}`;

    container.appendChild(articleRes);
    articleRes.appendChild(imgArt);
    articleRes.appendChild(content);
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(linkDetails);
    content.appendChild(author);

    articleRes.classList = 'section__news';
    content.classList = 'content';
    title.classList = 'section__news__title';
    desc.classList = 'section__news__desc';
    imgArt.classList = 'section__news__imgArt';
    linkDetails.classList = 'section__news__link';
    author.classList = 'section__news__author';
  }
};
const fetchMainRout = (rout) => fetch(rout);

fetchMainRout('/NewsToday')
  .then((result) => result.json())
  .then((res) => showResults(res))
  .catch(console.error);

const showErrMsg = () => {
  cleardate(container);
  const errMsg = document.createElement('h2');
  container.appendChild(errMsg);
  errMsg.textContent = 'Sorry, No result Found';
};

const displyData = (endpoint) => {
  emptyMsg.textContent = '';
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: searchInput.value }),
  }).then((result) => result.json())
    .then((res) => {
      if (res.totalResults > 0) {
        showResults(res);
      } else {
        showErrMsg();
      }
    })
    .catch(console.error);
};
// /// Disply data in Desktop device ////////
searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    if (searchInput.validity.valueMissing) {
      emptyMsg.textContent = '';
      emptyMsg.textContent = 'Empty value not allowed';
      emptyMsg.style.color = 'red';
    } else displyData('/search');
  }
});
// ///Disply data in all device////////
searchButton.addEventListener('click', () => {
  if (searchInput.validity.valueMissing) {
    emptyMsg.textContent = '';
    emptyMsg.textContent = 'Empty value not allowed';
    emptyMsg.style.color = 'red';
  } else displyData('/search');
});
