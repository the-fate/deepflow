var express  = require('express');
var router = express.Router();


// Welcome Page
router.get('/', (req, res) => res.render('welcome'));
router.get('/index', (req, res) => res.render('welcome'));

// Dashboard
// router.get('/dashboard',ensureAuthenticated, (req, res) => 
// res.render('dashboard', {
//     name: req.user.name
// }));
module.exports = router;