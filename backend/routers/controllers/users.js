const connection  = require("../../db/db");

// this function creat new Auther(new user)
const bcrypt = require("bcrypt");
// this function creat new Auther(new user)
const createNewAuthor = async(req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (firstName, lastName, age, country,email,password,role_id) VALUES(?,?,?,?,?,?,?)`;
  const data = [firstName, lastName, age, country,email,bcryptPassword,role_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err,
      });
    }
    res.status(200);
    res.json(result);
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
