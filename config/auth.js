const ROLE = {

    REGISTRAR: 'registrar',
    HEAD_TEACHER: 'head_teacher',
    TEACHER: 'teacher',
    STUDENT: 'student'
}

function authUser(req, res, next){
    if (req.user == null){
        res.status(403)
        req.flash('error_msg', 'Please log in to view this resourse');
        res.redirect('/users/login')
    }
}

function authTeacher(req, res, next){
    if(req.user.role != 'teacher'){
        req.flash('error_msg', 'You are not authorized to view this resource')
        res.redirect('/users/login')
    }
}
function authHeadTeacher(req, res, next){
    if(req.user.role != 'head_teacher'){
        req.flash('error_msg', 'You are not authorized to view this resource')
        res.redirect('/users/login')
    }
}
function authRegistrar(req, res, next){
    if(req.user.role != 'registrar'){
        req.flash('error_msg', 'You are not authorized to view this resource')
        res.redirect('/users/login')
    }
}



module.exports = {
    authUser

}