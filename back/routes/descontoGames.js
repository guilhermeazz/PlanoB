const express = require('express');
const router = express.Router();
const descontoGamesController = require('../controllers/descontoGamesController');

router.get('/', descontoGamesController.getDescontoGames);
router.post('/', descontoGamesController.createDescontoGame);
router.get('/:id', descontoGamesController.getDescontoGameById);
router.put('/:id', descontoGamesController.updateDescontoGame);
router.delete('/:id', descontoGamesController.deleteDescontoGame);

module.exports = router;
