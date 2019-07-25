const express = require('express');
const router = express.Router();
//
const cors = require('cors');
router.use(cors());

//
router.use('/', express.static('./'));
router.use('/phaser', express.static('./phaser3'));
router.use('/controllers', express.static('./controllers'));
router.use('/game_of_life', express.static('./game_of_life'));


module.exports = router;