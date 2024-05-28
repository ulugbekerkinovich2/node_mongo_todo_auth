const fileUpload = require("express-fileupload");
const cors = require("cors");
const authRoute = require("../routes/аuth.route");
const usersRoute = require("../routes/users.route");
const todoRoute = require("../routes/todo.route");
const connectDB = require("../../config/db");
const isAuthMiddleware = require("../middlewares/is-auth.middleware")






const modules = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(fileUpload());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(`${process.cwd()}/uploads`));
    app.use("/api/auth", authRoute);
    app.use("/api/users", usersRoute);
    app.use("/api/todos", todoRoute);
};

module.exports = modules;
