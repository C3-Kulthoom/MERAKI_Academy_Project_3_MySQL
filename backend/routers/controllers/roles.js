const connection  = require("../../db/db");

const createNewRole = (req, res) => {
  const { role } = req.body;
  const queryString = `INSERT INTO roles (role 
  ) VALUES(?)`;
  const data = [role];
  connection.query(queryString, data, (err, result) => {
   if(err){
     console.log(err.response);
   }
   res.status(200).json({ sucuess:"true" ,
  result:result,

  });
  });
};
module.exports = { createNewRole };
