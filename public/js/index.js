const searchInput = document.getElementById('search');
const container = document.querySelector('.section');


const cleardate = (myNode) => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};


const showResults = (result) => {
  cleardate(container);
  const resultLength = result.articles.length;
  for (let i = 0; i < resultLength; i++ ) {
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
    linkDetails.textContent = 'For more Details';
    linkDetails.href = result.articles[i].url;
    linkDetails.target = 'blank';
    author.textContent = result.articles[i].author;

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

fetchMainRout('/home')
  .then((result) => result.json())
  .then((res) => showResults(res))
  .catch(console.error);

searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: searchInput.value }),
    }).then((result) => result.json())
      .then((res) => showResults(res))
      .catch(console.error);
  }
});
