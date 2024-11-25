import superHero from '../models/superHero.mjs';
import iRepository from './iRepository.mjs';

class superHeroRepository extends iRepository {
    async obtenerPorId(id) {
        return await superHero.findById(id);
    }

    async obtenerTodos() {
        return await superHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        //const query = { [atributo]: new RegExp(valor, 'i') };
        if( !isNaN(valor)) {
            const query = { [atributo]: valor };
            return await superHero.find(query);
        } else {
            const query = { [atributo]: new RegExp(valor, 'i') };
            return await superHero.find(query);
        }    
    }

    async obtenerMayoresDe30() {
        return await superHero.find( { edad: { $gt: 30 }, planetaOrigen: 'Tierra', $expr: {$gte: [{ $size: "$poderes"}, 2]}});
    }

    async agregarSuperheroeNuevo(nuevoSuperheroe) {
        try {
            const superheroe = new superHero(nuevoSuperheroe); //Crear instancia del modelo
            return await superheroe.save();//Guardar en la base de datos
        } catch(error) {
            console.error("Error al agregar al superheroe", error);
            throw error;
        }
    }

    async actualizarSuperheroe(id, datosActualizados) {
        try {
            const superheroeActualizado = await superHero.findByIdAndUpdate(id,
                { $set: datosActualizados },
                { new: true } // Devuelve el documento actualizado
            );
            return superheroeActualizado;
        } catch (error) {
            console.error("Error en actualizarSuperheroe:", error.message);
            throw new Error("No se pudo actualizar el superhéroe en la base de datos");
        }
    }
    
    async eliminarSuperheroePorId(id) {
        try {
            const superheroeEliminado = await superHero.findByIdAndDelete(id);
            return superheroeEliminado;
        } catch (error) {
            console.error("Error en eliminarSuperheroePorId:", error.message);
            throw new Error("No se pudo eliminar el superhéroe por ID en la base de datos");
        }
    }
    
    async eliminarSuperheroePorNombre(nombre) {
        try {
            const superheroesEliminados = await superHero.deleteMany({ nombreSuperheroe: nombre });
            return superheroesEliminados;
        } catch (error) {
            console.error("Error en eliminarSuperheroePorNombre:", error.message);
            throw new Error("No se pudo eliminar los superhéroes por nombre en la base de datos");
        }
    }
    
}

export default new superHeroRepository;