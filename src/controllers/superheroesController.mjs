import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, agregarSuperheroe } 
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
