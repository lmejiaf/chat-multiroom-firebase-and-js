
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user.uid);
      window.location.replace("/ventanas/dashboard.html")
    } else {
      // No user is signed in.
    }
  });

function registrar(){
    
    let user= document.getElementById("txt_email").value;
    let pass= document.getElementById("txt_pass").value;
    firebase.auth().createUserWithEmailAndPassword(user, pass).then(()=>{window.alert("Registro exitoso");}).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        // showError(errorMessage);
        window.alert("error: "+errorMessage);
        
    });
    

}
function ingresar(){
    let user= document.getElementById("txt_email").value;
    let pass= document.getElementById("txt_pass").value;
    firebase.auth().signInWithEmailAndPassword(user, pass).then(()=>{window.alert("Ingreso exitoso");}).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // showError(errorMessage);
        window.alert("error: "+errorMessage);

        // ...
      });
      
}
