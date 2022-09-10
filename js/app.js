//referencias
const formulario = document.querySelector("#formulario");
const listaTareas = document.querySelector("#lista-tareas");
let tareas = [];

//event listeners
eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", agregarTarea);
  document.addEventListener("DOMContentLoaded", () => {
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    crearHTML();
  });
}

//funciones
function agregarTarea(e) {
  e.preventDefault();
  const tarea = document.querySelector("#tareas").value;
  //validación
  if (tarea === "") {
    mensajeError("No puede quedar vacío. Escribe una tarea por favor");

    return;
  }

  const tareaObj = {
    id: Date.now(),
    texto: tarea,
  };

  // añado la tarea al arreglo
  tareas = [...tareas, tareaObj];

  // creo html
  crearHTML();

  formulario.reset();
}

//muestra msj de error
function mensajeError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  // inserto el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);
  //elimina el msj despues de 3seg
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();
  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      // boton para eliminar tarea
      const btnX = document.createElement("a");
      btnX.classList.add("borrar-tareas");
      btnX.innerText = "X";

      btnX.onclick = () => {
        borrarTarea(tarea.id);
      };

      // creo la lista de tarea
      const li = document.createElement("li");
      li.innerText = tarea.texto;
      li.appendChild(btnX);
      listaTareas.appendChild(li);
    });
  }
  sincronizarStorage();
}
// agrega las tareas al LocalStorage
function sincronizarStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// elimina una tarea
function borrarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
  crearHTML();
}

function limpiarHTML() {
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
}
