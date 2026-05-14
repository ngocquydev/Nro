const Category = require("./CategoryRouter");
const User = require("./UserRouter");
const Product = require("./ProductRouter");
const Blogs = require("./BlogsRouter");
const NapThe = require("./NapTheRouter");
const routes = (app) => {
  app.use("/api/category", Category);
  app.use("/api/user", User);
  app.use("/api/product", Product);
  app.use("/api/blogs", Blogs);
  app.use("/api/napthe", NapThe);
};

module.exports = routes;
