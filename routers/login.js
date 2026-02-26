const LoginController = require('../controllers/loginController')
const router = require('express').Router()

router.get('/login', LoginController.showLogin)
router.post('/login', LoginController.login)

router.get('/register', LoginController.showRegister)
router.post('/register', LoginController.register)

router.get('logout', LoginController.logout)

module.exports = router