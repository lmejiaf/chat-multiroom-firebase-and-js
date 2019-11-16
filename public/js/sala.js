var usuario = null;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    usuario = user;
  } else {
    // No user is signed in.
    salir();
    window.location.replace("/index.html");

  }
});


var db = firebase.firestore();
var roomsRef = db.collection("rooms");
var usuarios;
roomsRef.doc(sessionStorage.getItem("nombre-sala")).onSnapshot((doc) => {

  console.log(doc.data());

  document.getElementById("nombreSala").innerHTML = doc.id;
  document.getElementById("creador").innerHTML = "creador: " + doc.data().creador.email;

  var integrantes = document.getElementById("lista-usuarios");
  integrantes.innerHTML = ``;
  var contenedormensajes = document.getElementById("contenedor-mensajes");
  contenedormensajes.innerHTML = ``;

  doc.data().integrantes.forEach(element => {
    integrantes.innerHTML += `
    <li class="lista-usuarios__user">
    <h3>${element.email}</h3>
    <h4>${element.uid}</h4>
    </li>`;
  });
  usuarios= doc.data().integrantes;

  doc.data().mensajes.forEach(element => {
    contenedormensajes.innerHTML += ` 
    <div class=" lista-usuarios__user lista-usuarios__user-active">
    <h3>${element.autor}</h3>
    <p>${element.mensaje}</p>
    </div>`;
  });


});



function salir() {
  firebase.auth().signOut().then(function () {
    limpiarStorage();
    window.location.replace("/index.html");
  }).catch(function (error) {
    alert("Error: " + error.message)
  });
}
function salirsala() {
  let user = usuario;
  roomsRef.doc(sessionStorage.getItem("nombre-sala")).update({
    integrantes: firebase.firestore.FieldValue.arrayRemove({ "email": user.email, "uid": user.uid })
  }).then(()=>{

    console.log("Eliminado correctamente de la sala");
    limpiarStorage();
    window.location.replace("/ventanas/dashboard.html");
    
  }).catch(err=>{
    console.log("error: "+err.message);
    
  });
  
  
}

function limpiarStorage() {
  sessionStorage.clear();
}
function sendMessage() {
  let user = usuario;
  let mensaje = document.getElementById("mensaje").value.trim();
  if (mensaje) {
    roomsRef.doc(sessionStorage.getItem("nombre-sala")).update({
      mensajes: firebase.firestore.FieldValue.arrayUnion({ "autor": user.email, "mensaje": mensaje })
    }).then(() => {
      console.log("mensaje enviado correctamente");
      document.getElementById("mensaje").value = "";
    }).catch(error => {
      console.Log("error: " + error.message);
    })
  } else {
    console.log("el mensaje no puede estár vacío");

  }


}


