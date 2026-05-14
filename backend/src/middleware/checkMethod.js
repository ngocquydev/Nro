const checkMethod = (allowedMethods) => {
  return (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    next();
  };
};
module.exports = { checkMethod };
