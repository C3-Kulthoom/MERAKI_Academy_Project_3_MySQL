const authorization = (string) => {
  return (req, res, next) => {
    if (
      !req.token ||
      !req.token.role ||
      !req.token.role.permissions ||
      !req.token.role.permissions.includes(string)
    ) {
      return res.status(403).json({
        success: false,
        message: `Unauthorizd`,
      });
    }

    next();
  };
};

module.exports = authorization;
