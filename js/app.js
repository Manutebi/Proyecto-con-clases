//Variables globales
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')



// Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto)

}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        console.log(this.gastos);
    }


}


class UI {
    insertarPresupuesto(cantidad) {
        //desctructuring
        const { presupuesto, restante } = cantidad;
        //Agregar al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //Crear el div para mostrar el mensaje
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-succes');
        }

        //Aggregar el mensaje de error

        divMensaje.textContent = mensaje;

        //Insertar en el html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar del html
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
        ;

    }

}

//INSTANCIAMOS
const ui = new UI();
let presupuesto;

//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto?')
    // console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); // Recarga la ventana actual
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    //leer los gastos
    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    //Validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no validad', 'error')
        return;

    }

    // Generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() } // lo contrario a desctructuring //object literal en hansmen

    //Anade nuevo gast3134o
    presupuesto.nuevoGasto(gasto);
    //Mensaje correcto
    ui.imprimirAlerta('Gasto agregado correctamente')
    //Reinicia el formulario
    formulario.reset();
}