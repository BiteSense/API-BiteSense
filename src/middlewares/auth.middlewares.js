const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        statusCode: 401,
        status: "error",
        message: "Unauthorized",
      });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decode) => {
      if (err)
        return res.status(403).json({
          statusCode: 403,
          status: "error",
          message: "Forbidden",
        });

      next();
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = verifyToken;
