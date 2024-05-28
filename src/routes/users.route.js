const {Router} = require("express");
const router = Router();
const {getUsers} = require("../controllers/users.controller");

router.get("/", getUsers);

module.exports = router;