class iRepository {

    obtenerPorId(id) {
        throw new Error("Método: 'obtenerPorId()' no implementado");
    }

    obtenerTodos() {
        throw new Error("Método: 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor) {
        throw new Error("Método: 'buscarPorAtributo' no implementado");
    }

    obtenerMayoresDe30() {
        throw new Error("Método: 'obtenerMayoresDe30' no implementado");
    }

    agregarSuperheroeNuevo() {
        throw new Error("Método: 'agregarSuperheroeNuevo' no implementado");
    }

    actualizarSuperheroe(id, datosActualizados) {
        throw new Error("Método: 'actualizarSuperheroe' no implementado");
    }

    eliminarSuperheroePorId(id) {
        throw new Error("Método: 'eliminarSuperheroePorId' no implementado");
    }

    eliminarSuperheroePorNombre(nombreSuperheroe) {
        throw new Error("Método: 'eliminarSuperheroePorNombre' no implementado");
    }
}

export default iRepository;