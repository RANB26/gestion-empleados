class Empleado{
    constructor(idEmpleado, cedula, nombre, apellido, cargo, sueldo){
        this.idEmpleado = idEmpleado;
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cargo = cargo;
        this.sueldo = sueldo;
    }
}

class NodoCircular{
    constructor(empleado){
        this.empleado = empleado;
        this.siguiente = null;
    }
}

class ListaCircularEmpleados{
    constructor(){
        this.cabeza = null;
    }

    insertar_empleado(empleado){
        let nuevoNodo = new NodoCircular(empleado);
        if(this.cabeza == null){
            nuevoNodo.siguiente = nuevoNodo;
            this.cabeza = nuevoNodo;
        }else{
            nuevoNodo.siguiente = this.cabeza;
            let nodoActual = this.cabeza;
            while(nodoActual.siguiente!=this.cabeza){
                nodoActual = nodoActual.siguiente;
            }
            nodoActual.siguiente = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
    }

    mostrar_empleados(){
        if(this.cabeza==null){
            return null
        }else{
            let nodoActual = this.cabeza
            while(true){
                console.log(nodoActual.empleado.idEmpleado +" "+ nodoActual.empleado.cedula);
                nodoActual = nodoActual.siguiente;
                if(nodoActual == this.cabeza){
                    break
                }
            }
        }
    }

    buscar_empleado(infoBuscar, tipoBusqueda){
        if(this.cabeza==null){
            return null
        }
        let nodoActual = this.cabeza;
        while(nodoActual){
            if(tipoBusqueda==1){
                if(nodoActual.empleado.idEmpleado == infoBuscar){
                    return nodoActual.empleado
                }
            }else if(tipoBusqueda==2){
                if(nodoActual.empleado.cedula == infoBuscar){
                    return nodoActual.empleado
                }
            }else{
                if(nodoActual.empleado.nombre == infoBuscar){
                    return nodoActual.empleado
                }
            }
            nodoActual = nodoActual.siguiente;
            if(nodoActual == this.cabeza){
                break
            }
        }
        return false
    }

    actualizar_empleado(idEmpleado, nuevaCedula, nuevoNombre, nuevoApellido, nuevoCargo, nuevoSueldo){
        if(this.cabeza == null){
            return null
        }
        let nodoActualizar = this.cabeza;
        while(true){
            if(nodoActualizar.empleado.idEmpleado == idEmpleado){
                nodoActualizar.empleado.cedula = nuevaCedula;
                nodoActualizar.empleado.nombre = nuevoNombre;
                nodoActualizar.empleado.apellido = nuevoApellido;
                nodoActualizar.empleado.cargo = nuevoCargo;
                nodoActualizar.empleado.sueldo = nuevoSueldo;
                return true
            }
            nodoActualizar = nodoActualizar.siguiente;
            if(nodoActualizar == this.cabeza){
                break
            }
        }
        return false
    }

    eliminar_empleado(idEliminar){
        if(this.cabeza == null){
            return null
        }
        if(this.cabeza.empleado.idEmpleado == idEliminar){
            if(this.cabeza.siguiente == this.cabeza){
                this.cabeza = null;
            }else{
                let nodoActual = this.cabeza;
                while(nodoActual.siguiente!=this.cabeza){
                    nodoActual = nodoActual.siguiente;
                }
                nodoActual.siguiente = this.cabeza.siguiente;
                this.cabeza = this.cabeza.siguiente;
            }
            return idEliminar
        }
        let nodoActual = null;
        let nodoSiguiente  = this.cabeza;
        while(nodoSiguiente.siguiente != this.cabeza){
            if(nodoSiguiente.empleado.idEmpleado == idEliminar){
                nodoActual.siguiente = nodoSiguiente.siguiente;
                return idEliminar
            }
            nodoActual = nodoSiguiente;
            nodoSiguiente = nodoSiguiente.siguiente
        }
        if(nodoSiguiente.empleado.idEmpleado == idEliminar){
            nodoActual.siguiente = this.cabeza;
            return idEliminar
        }
        return false
    }

    buscar_ultimo_id(){
        if(this.cabeza == null){
            return null
        }else{
            return this.cabeza.empleado.idEmpleado
        }
    }
}