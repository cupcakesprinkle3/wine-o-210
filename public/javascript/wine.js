async function newWineHandler(event) {
    event.preventDefault();

    //['id', 'wine_maker', 'wine_year', 'category', 'type', 'price', 'notes', 'created_at']

    const name = document.querySelector('#name').value.trim();
    const wine_maker = document.querySelector('#wine-maker').value.trim();
    const wine_year = document.querySelector('#wine-year').value.trim();
    const category = document.querySelector('#category').value.trim();
    const type = document.querySelector('#type').value.trim();
    const price = document.querySelector('#price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/wine`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        wine_maker,
        wine_year,
        category,
        type,
        price,
        notes
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-wine').addEventListener('submit', newWineHandler);