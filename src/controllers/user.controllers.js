const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_service = require("../services/user.services");

const handlerRegister = async (req, res) => {
  try {
    const { username, email, password, repassword } = req.body;

    //Checking password
    if (password != repassword) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Password and Repassword Different",
      });
    }

    //Checking Already email
    if ((await user_service.checkEmail(email)) === false) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Email Already Excist",
      });
    }

    //Enkrip Password
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(password, salt);

    user_service.registerUser(username, email, hash_password);
    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Register",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const handlerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Email
    if (await user_service.checkEmail(email)) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Email not Register",
      });
    }

    const data = await user_service.getAllByEmail(email);
    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Email or Password Incorrect",
      });
    }

    const user_id = data.id_user;
    const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await user_service.updateUserToken(token, user_id);

    res.cookie("token", token);
    res.cookie("id_user", user_id);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Login",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const handlerLogout = async (req, res) => {
  try {
    const id_user = req.cookies.id_user;
    await user_service.clearToken(id_user);

    res.clearCookie("id_user");
    res.clearCookie("jumlah_scan_produk");
    res.clearCookie("token");
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Logout",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = {
  handlerRegister,
  handlerLogin,
  handlerLogout,
};
