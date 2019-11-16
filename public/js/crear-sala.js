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
function atras() {
  window.location.replace("/ventanas/dashboard.html");
}
function crearsala() {
  let user = usuario;
  let nombreSala = document.getElementById("nombreSala").value;
  roomsRef.doc(nombreSala).get().then(function (doc) {
    if (doc.exists) {
      alert("modifique el nombre, esta sala ya existe")
    } else {

      roomsRef.doc(nombreSala).set({
        nombre: nombreSala,
        creador: {"uid":user.uid,"email":user.email},
        integrantes: [{"uid":user.uid,"email":user.email}],
        mensajes:[],
      })
        .then(function (docRef) {
          alert("Perfecto, sala creada correctamente");
          guardarNombreSala("nombre-sala", nombreSala);
          window.location.replace("/ventanas/sala.html")
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

    }
  }).catch(function (error) {
    console.log("Error: " + error);

  })
}
function salir() {
  firebase.auth().signOut().then(function () {
    window.location.replace("/index.html")
  }).catch(function (error) {
    alert("Error: " + error.message)
  });
}
function guardarNombreSala(llave, valor) {
  sessionStorage.setItem(llave, valor);
}
