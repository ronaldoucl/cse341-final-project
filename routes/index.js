const passport = require("passport");
const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/movies", require("./movies"));
router.use("/series", require("./series"));
router.use("/users", require("./users"));
router.use("/customers", require("./customers"));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err)}
        res.redirect('/');
    })
});


module.exports = router;