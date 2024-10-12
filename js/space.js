document.addEventListener('DOMContentLoaded', function () {
    const btnBuscar = document.getElementById('btnBuscar');
    const contenedor = document.getElementById('contenedor');
    const inputBuscar = document.getElementById('inputBuscar');
  
    btnBuscar.addEventListener('click', function () {
      const query = inputBuscar.value.trim();
  
      if (query) {
        // Limpiar el contenedor antes de buscar nuevas imágenes
        contenedor.innerHTML = '';
  
        // URL de la API con el parámetro de búsqueda
        const url = `https://images-api.nasa.gov/search?q=${query}`;
  
        // Realizar la solicitud a la API
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Acceder a los resultados dentro del objeto "collection.items"
            const resultados = data.collection.items;
  
            // Recorrer los resultados y generar tarjetas
            resultados.forEach(item => {
              const imagen = item.links ? item.links[0].href : 'https://via.placeholder.com/300';
              const titulo = item.data[0].title || 'Sin título';
              const descripcion = item.data[0].description || 'Sin descripción';
              const fecha = item.data[0].date_created || 'Fecha desconocida';
  
              // Crear la tarjeta de Bootstrap
              const card = `
                <div class="card mb-4" style="width: 18rem;">
                  <img src="${imagen}" class="card-img-top" alt="${titulo}">
                  <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${descripcion}</p>
                    <p class="card-text"><small class="text-muted">${fecha}</small></p>
                  </div>
                </div>
              `;
  
              // Añadir la tarjeta al contenedor
              contenedor.innerHTML += card;
            });
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            contenedor.innerHTML = '<p class="text-danger">Hubo un error al buscar las imágenes. Inténtalo nuevamente.</p>';
          });
      } else {
        alert('Por favor, ingresa un término de búsqueda.');
      }
    });
  });
  