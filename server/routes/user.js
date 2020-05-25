const express = require('express');
const router = express.Router();
const auth = require("../middleware/validation").auth;
const admin = require("../middleware/validation").admin;

const { userById, read, update, purchaseHistory } = require("../controllers/user");

router.get('/secret', auth, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', auth, read);
router.put('/user/:userId', auth, update);
router.get('/orders/by/user/:userId', auth, purchaseHistory);

router.param('userId', userById);

module.exports = router;
