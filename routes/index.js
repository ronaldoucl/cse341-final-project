const passport = require("passport");
const router = require("express").Router();
require("dotenv").config();

//routes for each collection
router.use("/", require("./swagger"));
router.use("/movies", require("./movies"));
router.use("/series", require("./series"));
router.use("/users", require("./users"));
router.use("/customers", require("./customers"));


// GitHub OAuth routes
router.get('/login', passport.authenticate('github', {
    scope: ['user:email'],
    callbackURL: process.env.CALLBACK_URL,
    
}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err)}
        res.redirect('/');
    })
});


module.exports = router;