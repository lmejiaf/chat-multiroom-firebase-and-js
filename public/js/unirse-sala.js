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
function unirsesala() {
  let user = usuario;
  let nombreSala = document.getElementById("nombreSala").value;
  roomsRef.doc(nombreSala).update({
      integrantes: firebase.firestore.FieldValue.arrayUnion({"uid":user.uid,"email":user.email})
  }).then(()=>{
    guardarNombreSala("nombre-sala", nombreSala);
      window.location.replace("/ventanas/sala.html")
  }).catch(error=>{
      alert("error: "+"la sala no existe")
  })
  
}
function salir(){
  firebase.auth().signOut().then(function() {
    window.location.replace("/index.html")
  }).catch(function(error) {
    alert("Error: "+error.message)
  });
}
function guardarNombreSala(llave, valor) {
  sessionStorage.setItem(llave, valor);
}