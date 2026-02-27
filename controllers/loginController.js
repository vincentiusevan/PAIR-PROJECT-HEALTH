const { User } = require('../models')
const bcrypt = require('bcryptjs')

class LoginController {
    static async showLogin(req, res) {
        try {
            res.render('login', { error: null })
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return res.render('login', { error: 'Invalid email/password' })
            }

            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
                return res.render('login', { error: 'Invalid email/password' })
            }

            req.session.userId = user.id
            req.session.role = user.role

            if (user.role === 'admin') {
                return res.redirect('/doctors')
            } else {
                return res.redirect('/patients')
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showRegister(req, res) {
        try {
            res.render('register', { error: null })
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password } = req.body
            await User.create({ username, email, password, role: 'patient' })
            res.redirect('/login')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(el => el.message)
                return res.render('register', { error: errors[0] })
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.render('register', { error: 'Email already registered' })
            }
            console.log(error)
            res.send(error)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(() => {
                res.redirect('/login')
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = LoginController