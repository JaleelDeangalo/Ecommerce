const express = require('express');
const router = express.Router();
const auth = require("../middleware/validation").auth;
const admin = require("../middleware/validation").admin;

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', auth, admin, create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/category/:categoryId/:userId', auth, admin, update);

router.delete('/category/:categoryId/:userId',auth, admin, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
