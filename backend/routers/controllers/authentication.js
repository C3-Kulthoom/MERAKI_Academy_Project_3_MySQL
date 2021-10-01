const connection  = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM users WHERE email= ? `
  // const valid = await bcrypt.compare(password, result.password);
  const data = [email , password ];
 
    connection.query(query, data,  async (err, result) => {
      const valid = await bcrypt.compare(password, result[0].password);
    
             if (valid) {
           
            
            const payload = {
               userId: result[0].id,
             country: result[0].country,
               role: result[0].role_id,
           };
    
            const options = {
              expiresIn: "60m",}


              const token =   await jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Email and Password are correct`,
          token: token,
        });


        
      }else{
        res.status(403).json({
          success: false,
          message: `Password is not correct`,
        });
      };



      if(err){
       res.status(500).json({
         success: false,
         message:  `email not exist `,
       });
      }
    }
  )};

  // usersModel
  //   .findOne({ email })
  //   .populate("role", "-_id -__v")
  //   .exec()
  //   .then(async (result) => {
  //     if (!result) {
  //       return res.status(404).json({
  //         success: false,
  //         message: `The email doesn't exist`,
  //       });
  //     }
  //     try {
  //       const valid = await bcrypt.compare(password, result.password);
  //       if (!valid) {
  //         return res.status(403).json({
  //           success: false,
  //           message: `The password you’ve entered is incorrect`,
  //         });
  //       }
  //       const payload = {
  //         userId: result._id,
  //         country: result.country,
  //         role: result.role,
  //       };

  //       const options = {
  //         expiresIn: "60m",
      // };

        // console.log(payload);
//         const token = await jwt.sign(payload, process.env.SECRET, options);
//         res.status(200).json({
//           success: true,
//           message: `Email and Password are correct`,
//           token: token,
//         });
//       } catch (error) {
//         throw new Error(error.message);h
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err,
//       });
//     });
// };

module.exports = {
  login,
};
