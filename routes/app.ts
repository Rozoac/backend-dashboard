import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const app = Router();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada'
    })
});

export default app;
