module.exports = app => {

  const router = require("express").Router();
  const AuthController = require('../Controllers/Auth.Controller')
  const UserController = require('../Controllers/User.Controller.js')
  const createError = require('http-errors')
  const { body } = require("express-validator")

  // index
  router.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome express mysql application." });
  });

  router.post('/register',   
    // validate fields.
    body("name").isLength({ min: 1 }).trim().withMessage("Name must be specified.")
      .isAlphanumeric().withMessage("Name has non-alphanumeric characters."),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
      .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 8 }).trim().withMessage("Password must be 8 characters or greater."),
    body("gender").isLength({ min: 1 }).trim().withMessage("Gender name must be specified."),
    body("role").isLength({ min: 1 }).trim().withMessage("Role name must be specified."),
    // sanitize fields.
    body("name").escape(),
    body("email").escape(),
    body("password").escape(),
    body("gender").escape(),
    body("role").escape(),
    AuthController.register)

  router.post('/login', 
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
      .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 8 }).trim().withMessage("Password must be 8 characters or greater."),
    body("email").escape(),
    body("password").escape(),
    AuthController.login)

  router.get('/verify', AuthController.userAuthorization)

  // read all user data
  router.get('/users', UserController.findAll);
  // read user data by id
  router.get('/users/:id', UserController.findOne);
  // update user data by id
  router.put('/users/:id', UserController.findOneAndUpdate);
  // delete user data by id
  router.delete('/users/:id', UserController.destroyById);
  // delete all user data
  router.delete('/users', UserController.destroyAll);

  app.use('/api', router)

  app.use(async (req, res, next) => {
    next(createError.NotFound())
  })
  
  app.use((err, req, res, next) => {
    return res.status(err.status || 500).send({
      error: err.message
    })
  })

};
