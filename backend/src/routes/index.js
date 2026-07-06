const User = require('./UserRouter');
const Category = require('./CategoryRouter');
const Products = require('./ProductsRouter');
const Recharge = require('./RechargeRouter');
const ATM = require('./ATMRouter');
const BuyAccount = require('./BuyAccountRouter');
const Account = require('./AccountRouter');
const routes = (app) => {
  app.use('/api/user', User);
  app.use('/api/category', Category);
  app.use('/api/product', Products);
  app.use('/api/recharge', Recharge);
  app.use('/api/atm', ATM);
  app.use('/api/buy', BuyAccount);
  app.use('/api/account', Account);
};

module.exports = routes;
