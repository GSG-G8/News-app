const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: searchInput.value}),
    }).then(result => result.json()).then(console.log);
  }
});