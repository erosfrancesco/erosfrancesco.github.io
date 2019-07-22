const express = require('express');
const router = express.Router();
//
const cors = require('cors');
router.use(cors());

//
router.use('/', express.static('./'));
router.use('/phaser', express.static('./phaser3'));


module.exports = router;