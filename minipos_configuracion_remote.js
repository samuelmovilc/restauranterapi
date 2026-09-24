const router = require('express').Router();
const db = require('../db/connection');
const { auth } = require('../middleware/auth');

// GET /api/configuracion — público (pedido.html lo necesita)
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM configuracion LIMIT 1');
    res.json({ success: true, data: rows[0] || {} });
  } catch (err) { next(err); }
});

// PUT /api/configuracion — solo admin
router.put('/', auth, async (req, res, next) => {
  try {
    const { nombre_negocio, nit, telefono, ciudad, direccion, slogan, color_primario, imprimir_auto } = req.body;
    await db.query(
      `INSERT INTO configuracion (id, nombre_negocio, nit, telefono, ciudad, direccion, slogan, color_primario, imprimir_auto)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        nombre_negocio = COALESCE(VALUES(nombre_negocio), nombre_negocio),
        nit            = COALESCE(VALUES(nit), nit),
        telefono       = COALESCE(VALUES(telefono), telefono),
        ciudad         = COALESCE(VALUES(ciudad), ciudad),
        direccion      = COALESCE(VALUES(direccion), direccion),
        slogan         = COALESCE(VALUES(slogan), slogan),
        color_primario = COALESCE(VALUES(color_primario), color_primario),
        imprimir_auto  = COALESCE(VALUES(imprimir_auto), imprimir_auto)`,
      [nombre_negocio, nit, telefono, ciudad, direccion, slogan, color_primario, imprimir_auto ?? null]
    );
    const [rows] = await db.query('SELECT * FROM configuracion WHERE id = 1');
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
});

// PUT /api/configuracion/logo — solo admin (recibe { logo_url: string })
router.put('/logo', auth, async (req, res, next) => {
  try {
    const { logo_url } = req.body;
    if (!logo_url) return res.status(400).json({ success: false, error: { code: 'URL_REQUERIDA', message: 'logo_url es requerido' } });
    await db.query(`
      INSERT INTO configuracion (id, logo_url) VALUES (1, ?)
      ON DUPLICATE KEY UPDATE logo_url = VALUES(logo_url)
    `, [logo_url]);
    res.json({ success: true, data: { logo_url } });
  } catch (err) { next(err); }
});

// DELETE /api/configuracion/logo — solo admin
router.delete('/logo', auth, async (req, res, next) => {
  try {
    await db.query('UPDATE configuracion SET logo_url = NULL WHERE id = 1');
    res.json({ success: true, data: { logo_url: null } });
  } catch (err) { next(err); }
});

module.exports = router;
