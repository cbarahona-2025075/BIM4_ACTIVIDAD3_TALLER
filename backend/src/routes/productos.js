import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, nombre, precio, stock FROM productos ORDER BY id ASC'
        );

        res.json({ productos: result.rows });
    } catch (error) {
        console.error('Error listando productos:', error);
        res.status(500).json({
            message: 'No se pudo consultar PostgreSQL'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT id, nombre, precio, stock FROM productos WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ producto: result.rows[0] });
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({
            message: 'No se pudo consultar PostgreSQL'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;

        if (!nombre || precio === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const result = await pool.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING id, nombre, precio, stock',
            [nombre, precio, stock]
        );

        res.status(201).json({ producto: result.rows[0] });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({
            message: 'No se pudo crear el producto'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;

        if (!nombre || precio === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const result = await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING id, nombre, precio, stock',
            [nombre, precio, stock, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ producto: result.rows[0] });
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({
            message: 'No se pudo actualizar el producto'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM productos WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error eliminando producto:', error);
        res.status(500).json({
            message: 'No se pudo eliminar el producto'
        });
    }
});

export default router;