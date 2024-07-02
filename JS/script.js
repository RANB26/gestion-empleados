// ========================= VARIABLES =========================

var listaEmpleados = new ListaCircularEmpleados();

// ===================== FUNCIONES Y EVENTOS ===================

// ---------------------- BUSCAR ----------------------

//Valida que el input se deshabilite si no se elige un tipo de filtro
function validarTipoBusqueda(){
    let valueTipoBusqueda = $("#tipo-busqueda-empleado").val();
    if(valueTipoBusqueda == 0){
        $("#info-buscar").attr('disabled', true);
        $("#info-buscar").val("");
    }else{
        $("#info-buscar").attr('disabled', false);
    }
}

//Valida que no se ejecute el filtro con el input vacio
$("#btn-filtrar-empleado").on("click",function(){
    let valueTipoBusqueda = $("#tipo-busqueda-empleado").val();
    let valueInfoBuscar = $("#info-buscar").val();

    if((valueInfoBuscar.length>0) && (valueTipoBusqueda!=0)){
        listarBusquedaEmpleado(valueInfoBuscar, valueTipoBusqueda);
    }else if(valueTipoBusqueda==0){
        mostrarEmpleados();
    }else{
        alert("Ingresar información completa")
    }
    
});

//Busca el empleado en la lista e imprime en la tabla lo que encuenta
function listarBusquedaEmpleado(infoBuscar, tipoBusqueda){
    let empleadoBuscado = listaEmpleados.buscar_empleado(infoBuscar, tipoBusqueda);

    if(empleadoBuscado == null){
        $("#tabla-empleados tbody").html("");
        $(".info-fin-tabla").html("No hay empleados en la lista");
    }else if(empleadoBuscado == false){
        $("#tabla-empleados tbody").html("");
        $(".info-fin-tabla").html("No se encontró el empleado en la lista");
    }else{
        $("#tabla-empleados tbody").html("");

        let trEmpleado = `<tr>`
            +`<td>${empleadoBuscado.idEmpleado}</td>`
            +`<td>${empleadoBuscado.cedula}</td>`
            +`<td>${empleadoBuscado.nombre}</td>`
            +`<td>${empleadoBuscado.apellido}</td>`
            +`<td>${empleadoBuscado.cargo}</td>`
            +`<td>${empleadoBuscado.sueldo}</td>`
            +`<td>`
                +`<button onclick="abrirModalActualizarEmpleado(${empleadoBuscado.idEmpleado})" class="btn btn-sm btn-warning me-1" type="button"><i class="bi bi-pencil-square"></i></button>`
                +`<button onclick="abrirModalEliminarEmpleado(${empleadoBuscado.idEmpleado})" class="btn btn-sm btn-danger" type="button"><i class="bi bi-trash-fill"></i></button>`
            +`</td>`
        +`</tr>`;

        $("#tabla-empleados tbody").html(trEmpleado);
        $(".info-fin-tabla").html("Total registros: 1");
    }

}

// ---------------------- MOSTRAR ----------------------

//Evento para el botn consultar
$("#btn-mostrar-empleados").on("click",function(){
    mostrarEmpleados();
})

//Muestra todos los empleados de la lista
function mostrarEmpleados(){
    if(listaEmpleados.cabeza==null){
        $("#tabla-empleados tbody").html("");
        $(".info-fin-tabla").html("No hay empleados en la lista");
    }else{
        let nodoActual = listaEmpleados.cabeza;
        let contEmpleados = 0;

        $("#tabla-empleados tbody").html("");

        //Recorre los empleados
        while(true){
            contEmpleados+=1;
            let trEmpleado = `<tr>`
                +`<td>${nodoActual.empleado.idEmpleado}</td>`
                +`<td>${nodoActual.empleado.cedula}</td>`
                +`<td>${nodoActual.empleado.nombre}</td>`
                +`<td>${nodoActual.empleado.apellido}</td>`
                +`<td>${nodoActual.empleado.cargo}</td>`
                +`<td>${nodoActual.empleado.sueldo}</td>`
                +`<td>`
                    +`<button onclick="abrirModalActualizarEmpleado(${nodoActual.empleado.idEmpleado})" class="btn btn-sm btn-warning me-1" type="button"><i class="bi bi-pencil-square"></i></button>`
                    +`<button onclick="abrirModalEliminarEmpleado(${nodoActual.empleado.idEmpleado})" class="btn btn-sm btn-danger" type="button"><i class="bi bi-trash-fill"></i></button>`
                +`</td>`
            +`</tr>`;
            $("#tabla-empleados tbody").append(trEmpleado);
            nodoActual = nodoActual.siguiente;
            if(nodoActual == listaEmpleados.cabeza){
                break
            }
        }

        $(".info-fin-tabla").html("Total registros: "+contEmpleados);
    }
}


// --------------------- INSERTAR --------------------

//Evento para abrir el modal de añadir empleado
$("#btn-add").on("click",function(){

    $("#input-modal-add-id").val("");
    $("#input-modal-add-cedula").val("");
    $("#input-modal-add-nombre").val("");
    $("#input-modal-add-apellido").val("");
    $("#input-modal-add-cargo").val("");
    $("#input-modal-add-sueldo").val("");
    $("#btn-add-empleado").attr('disabled', true);

    let idUltimoEmpleado = listaEmpleados.buscar_ultimo_id();

    if(idUltimoEmpleado == null){
        $("#input-modal-add-id").val(1);
    }else{
        $("#input-modal-add-id").val(parseInt(idUltimoEmpleado)+1);
    }

    $("#modal-add-empleado").modal("show");
});

//Evento keyup para validar que no se cree un empleado con informacion vacía
$('#input-modal-add-cedula, #input-modal-add-nombre, #input-modal-add-apellido, #input-modal-add-cargo, #input-modal-add-sueldo').on('keyup', function() {
    let valueCedula = $("#input-modal-add-cedula").val();
    let valueNombre = $("#input-modal-add-nombre").val();
    let valueApellido = $("#input-modal-add-apellido").val();
    let valueCargo = $("#input-modal-add-cargo").val();
    let valueSueldo = $("#input-modal-add-sueldo").val();

    if(valueCedula == "" || valueNombre == "" || valueApellido == "" || valueCargo == "" || valueSueldo == ""){
        $("#btn-add-empleado").attr('disabled', true);
    }else{
        $("#btn-add-empleado").attr('disabled', false);
    }

});

//Evento para añadir un nuevo empleado
$("#btn-add-empleado").on("click", function(){
    let idEmpleado = $("#input-modal-add-id").val();
    let cedula = $("#input-modal-add-cedula").val();
    let nombre = $("#input-modal-add-nombre").val();
    let apellido = $("#input-modal-add-apellido").val();
    let cargo = $("#input-modal-add-cargo").val();
    let sueldo = $("#input-modal-add-sueldo").val();

    if(idEmpleado=="" || cedula == "" || nombre == "" || apellido == "" || cargo == "" || sueldo == ""){
        alert("Ningún campo puede estar vacío");
    }else{
        let nuevoEmpleado = new Empleado(idEmpleado, cedula, nombre, apellido, cargo, sueldo);
        listaEmpleados.insertar_empleado(nuevoEmpleado);
        $("#modal-add-empleado").modal("hide");
        alert("Empleado añadido correctamente");
        mostrarEmpleados();
    }
});

// --------------------- ACTUALIZAR --------------------

//Función para abrir el modal de actualizar empleado
function abrirModalActualizarEmpleado(idEmpleado){
    let empleadoActualizar = listaEmpleados.buscar_empleado(idEmpleado, 1);

    if(empleadoActualizar!= null || empleadoActualizar!=false){
        $("#titulo-modal-actualizar-empleado span").html(idEmpleado);
        $("#input-modal-ac-id").val(empleadoActualizar.idEmpleado);
        $("#input-modal-ac-cedula").val(empleadoActualizar.cedula);
        $("#input-modal-ac-nombre").val(empleadoActualizar.nombre);
        $("#input-modal-ac-apellido").val(empleadoActualizar.apellido);
        $("#input-modal-ac-cargo").val(empleadoActualizar.cargo);
        $("#input-modal-ac-sueldo").val(empleadoActualizar.sueldo);
        $("#btn-actualizar-empleado").attr('disabled', false);

        $("#modal-actualizar-empleado").modal("show");
    }else{
        alert("Error al buscar empleado");
    }
}

//Evento keyup para validar que no se actualice un empleado con informacion vacía
$('#input-modal-ac-cedula, #input-modal-ac-nombre, #input-modal-ac-apellido, #input-modal-ac-cargo, #input-modal-ac-sueldo').on('keyup', function() {
    let valueCedula = $("#input-modal-ac-cedula").val();
    let valueNombre = $("#input-modal-ac-nombre").val();
    let valueApellido = $("#input-modal-ac-apellido").val();
    let valueCargo = $("#input-modal-ac-cargo").val();
    let valueSueldo = $("#input-modal-ac-sueldo").val();

    if(valueCedula == "" || valueNombre == "" || valueApellido == "" || valueCargo == "" || valueSueldo == ""){
        $("#btn-actualizar-empleado").attr('disabled', true);
    }else{
        $("#btn-actualizar-empleado").attr('disabled', false);
    }

});

//Evento para actualizar un empleado
$("#btn-actualizar-empleado").on("click", function(){
    let idEmpleado = $("#input-modal-ac-id").val();
    let nuevaCedula = $("#input-modal-ac-cedula").val();
    let nuevoNombre = $("#input-modal-ac-nombre").val();
    let nuevoApellido = $("#input-modal-ac-apellido").val();
    let nuevoCargo = $("#input-modal-ac-cargo").val();
    let nuevoSueldo = $("#input-modal-ac-sueldo").val();

    if(idEmpleado=="" || nuevaCedula == "" || nuevoNombre == "" || nuevoApellido == "" || nuevoCargo == "" || nuevoSueldo == ""){
        alert("Ningún campo puede estar vacío");
    }else{
        let empleadoActualizado = listaEmpleados.actualizar_empleado(idEmpleado, nuevaCedula, nuevoNombre, nuevoApellido, nuevoCargo, nuevoSueldo);
        if(empleadoActualizado==true){
            $("#modal-actualizar-empleado").modal("hide");
            alert("Empleado actualizado correctamente");
            mostrarEmpleados();
        }else if(empleadoActualizado==null){
            alert("Error: La lista se encuentra vacía");
        }else{
            alert("Error: Empleado no encontrado")
        }
        
    }
});

// --------------------- ELIMINAR --------------------

//Función para abrir el modal de eliminar empleado
function abrirModalEliminarEmpleado(idEmpleado){
    $(".text-eliminar-empleado b").html(idEmpleado);
    $("#modal-eliminar-empleado").modal("show");
}

//Elimina el empleado seleccionado
$("#btn-eliminar-empleado").on("click",function(){
    let idEmpleado = $(".text-eliminar-empleado b").html();

    let empleadoEliminado = listaEmpleados.eliminar_empleado(idEmpleado);

    if(empleadoEliminado==idEmpleado){
        $("#modal-eliminar-empleado").modal("hide");
        mostrarEmpleados();
    }else if(empleadoEliminado==null){
        alert("Error: La lista se encuentra vacía")
    }else{
        alert("Error: Empleado no encontrado");
    }
});