import { request } from 'express';
import pool from './db.js';

export const getCouleurs = (callback) => {

  pool.query('SELECT value FROM couleur', (error, result) => {
    if (error) {
      throw error;
    }
    callback(result.rows);
  });
};

export const getChaussuresDispos = (callback) => {
  pool.query(`SELECT * FROM chaussure  WHERE id NOT IN (
    SELECT gauche_id as id FROM paire UNION SELECT droite_id as id FROM paire
  )`, (error, result) => {
    if (error) {
      throw error;
    }
    callback(result.rows);
  });
};

export const getCouleur = (id, callback) =>  {
  pool.query('SELECT value FROM couleur WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    callback(result.rows[0]);
    // response.status(201).send(result.rows[0]);
  });
};


export const getNewPaire = (request, response) => {
  getChaussuresDispos((chaussures) => {

  });
};;
