import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, agregarSuperheroe, actualizarSuperheroe, eliminarSuperheroePorId, eliminarSuperheroePorNombre } 
from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';



export async function obtenerSuperheroePorIdController (req, res) {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}

export async function obtenerTodosLosSuperheroesController (req, res) {
    const superheroes = await obtenerTodosLosSuperheroes();

        res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController (req, res) {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if(superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    } else {
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller (req, res) {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function agregarSuperheroeController(req, res) {
    try {
        const nuevoSuperheroe = req.body;

        // Llamar al servicio para agregar el superhéroe
        const superheroeAgregado = await agregarSuperheroe(nuevoSuperheroe);

        // Responder con el superhéroe creado
        res.status(201).send({
            mensaje: "Superhéroe agregado exitosamente",
            superheroe: superheroeAgregado,
        });
    } catch (error) {
        console.error("Error en agregarSuperheroeController:", error);
        res.status(500).send({ mensaje: "Error al agregar el superhéroe", error: error.message });
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeActualizado = await actualizarSuperheroe(id, req.body);

        if (superheroeActualizado) {
            res.status(200).send(renderizarSuperheroe(superheroeActualizado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar superhéroe:", error);
        res.status(500).send({ mensaje: "Error al actualizar superhéroe" });
    }
}

export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await eliminarSuperheroePorId(id);

        if (superheroe) {
            res.status(200).send(renderizarSuperheroe(superheroe));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar superhéroe por ID:", error);
        res.status(500).send({ mensaje: "Error al eliminar superhéroe" });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;

    try {
        const resultado = await eliminarSuperheroePorNombre(nombre);
        if (resultado.deletedCount > 0) {
            res.status(200).send({ mensaje: `${resultado.deletedCount} superhéroe(s) eliminado(s)` });
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese nombre" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error interno al eliminar superhéroe por nombre" });
    }
}




