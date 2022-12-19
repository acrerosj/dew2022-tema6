const TABLA_USUARIOS = document.querySelector('table#usuarios tbody');
const USUARIO_DETALLE = document.querySelector('#detalle');
const DIVISION_ALBUMES = document.querySelector('#albumes');

function loadUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    console.log(users);
    users.forEach(user => {
      let row = document.createElement('tr');
      let cellId = document.createElement('td');
      cellId.textContent = user.id;
      let cellName = document.createElement('td');
      cellName.textContent = user.name;
      row.append(cellId, cellName);
      TABLA_USUARIOS.append(row);

      cellName.addEventListener('click', ()=>detalleUsuario(user));
    });
  });
}

function detalleUsuario(user) {
  console.log('mostrar usuario', user.id);
  fetch('https://jsonplaceholder.typicode.com/users/'+user.id)
    .then(response => response.json())
    .then(user => {
      console.log(user)
      USUARIO_DETALLE.innerHTML = `
        <h1>${user.name}, ${user.username}</h1>
        <h2>${user.email}</h2>
        <p>${user.phone}</p>
      `;
    });
  USUARIO_DETALLE.innerHTML = "Cargando usuario con id = " + user.id;
  
  fetch('https://jsonplaceholder.typicode.com/users/'+user.id+'/albums')
    .then(response => response.json())
    .then(albumes => {
      console.log(albumes);
      DIVISION_ALBUMES.innerHTML = "";
      albumes.forEach(album => {
        let div = document.createElement('div');
        div.classList.add('album');
        let encabezado = document.createElement('h1');
        encabezado.textContent =album.title;
        div.append(encabezado);
        DIVISION_ALBUMES.append(div);

        encabezado.addEventListener('click', () => cargarFotosAlbum(album.id, div))
      });
    });
  DIVISION_ALBUMES.innerHTML = "Cargando álbumes del usuario...";
}

function cargarFotosAlbum(id, div) {
  fetch('https://jsonplaceholder.typicode.com/albums/' + id + '/photos')
    .then(response => response.json())
    .then(photos => {
      console.log(photos);
      photos.forEach(photo => {
        let img = document.createElement('img');
        img.src = photo.thumbnailUrl;
        img.alt = photo.title;
        div.append(img);
      });
    });
}