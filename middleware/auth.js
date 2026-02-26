function isAdmin(req, res, next) {
    if (!req.session.userId || req.session.role !== 'admin') {
        return res.redirect('/login')
    }
    next()
}

function isPatient(req, res, next) {
    if (!req.session.userId || req.session.role !== 'patient') {
        return res.redirect('/login')
    }
    next()
}

module.exports = { isAdmin, isPatient }