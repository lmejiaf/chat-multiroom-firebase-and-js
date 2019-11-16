firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      
    } else {
      // No user is signed in.
      salir();
      window.location.replace("/index.html");
      
    }
  });
  function salir(){
    firebase.auth().signOut().then(function() {
      window.location.replace("/index.html")
    }).catch(function(error) {
      alert("Error: "+error.message)
    });
  }
  function pasarcrear(){
    window.location.replace("/ventanas/crear-sala.html");
    
  }
  function pasarunir(){
    window.location.replace("/ventanas/unirse-sala.html");
    
  }