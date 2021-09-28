const usersModel = require("../../db/models/users");

// this function creat new Auther(new user)
const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Success Author Added`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
const getAllAuthors = (req,res) => {
  usersModel
    .find({})
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `All Authors `,
        authors: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
module.exports = {
  createNewAuthor,
  getAllAuthors,
};
