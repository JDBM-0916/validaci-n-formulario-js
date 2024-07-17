const firebaseConfig = {
  apiKey: "AIzaSyCngLD5n4-xZKLPsiPrlbXAD5V0BTGhzAg",
  authDomain: "formulario-js-jdbm.firebaseapp.com",
  projectId: "formulario-js-jdbm",
  storageBucket: "formulario-js-jdbm.appspot.com",
  messagingSenderId: "506589803821",
  appId: "1:506589803821:web:441ab928b5836ec6978fa4",
  measurementId: "G-XDD8L6K6L5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//obtener el elemento del formulario y añadir las validaciones
document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  // VALIDACION DEL NOMBRE
  let nombreRecibido = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (nombreRecibido.value.trim() === "") {
    errorNombre.textContent = "por favor introduce un nombre valido";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  // VALIDACION DEL CORREO
  let correoRecibido = document.getElementById("email");
  let errorCorreo = document.getElementById("emailError");
  let expresiondeCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expresiondeCorreo.test(correoRecibido.value)) {
    // si la expresion del correo no coincide con el correo recibido
    errorCorreo.textContent = "correo no valido";
    errorCorreo.classList.add("error-message");
  } else {
    errorCorreo.textContent = "";
    errorCorreo.classList.remove("error-message");
  }

  // // VALIDACION DE LA CONTRASEÑA
  let claveRecibida = document.getElementById("password");
  let errorClave = document.getElementById("passwordError");
  let expresionClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!expresionClave.test(claveRecibida.value)) {
    errorClave.textContent = "contraseña debe tener minimo 8 caracteres ";
    errorClave.classList.add("error-message");
  } else {
    errorClave.textContent = "";
    errorClave.classList.remove("error-message");
  }

  //  SI TODOS LAS VALIDACIONES ESTAN CORRECTAS ENVIAR FORMULARIO

  if (
    !errorNombre.textContent &&
    !errorCorreo.textContent &&
    !errorClave.textContent
  ) {
    //BACKEND QUE ME RECIBE LA INFORMACION

    db.collection("users")
      .add({
        nombre: nombreRecibido.value,
        correo: correoRecibido.value,
        clave: claveRecibida.value,
      })
      .then((docRef) => {
        alert("el formulario se ha enviado con exito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert('se presento el error', error);
      });
  }
});
