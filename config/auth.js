const ROLE = {

    REGISTRAR: 'registrar',
    HEAD_TEACHER: 'head_teacher',
    TEACHER: 'teacher',
    STUDENT: 'student'
}




module.exports = {
    ROLE: ROLE,
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');

    }
}