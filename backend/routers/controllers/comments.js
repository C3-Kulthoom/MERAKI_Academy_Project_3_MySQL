const connection  = require("../../db/db");

const createNewComment = (req, res) => {
  const article_id = req.params.id 
  const { comment,
    commenter_id } = req.body;
  const queryString = `INSERT INTO comments (
    comment,
    commenter_id,
    article_id
  ) VALUES(?,?,?)`;
  const data = [
    comment,
commenter_id,article_id];
  connection.query(queryString, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err,
      });}
      res.status(200).json({success : true , message:"new comment created", result:result});
    });
  };


  
//   const { comment, commenter } = req.body;
//   const id = req.params.id;
//   const newComment = new commentsModel({
//     comment,
//     commenter,
//   });

//   newComment
//     .save()
//     .then((result) => {
//       articlesModel
//         .findByIdAndUpdate(id, { $push: { comments: result._id } })
//         .then((done) => {
//           console.log(done);
//           res.status(201).json({
//             success: true,
//             message: `The new comment added`,
//             comment: result,
//           });
//         })
//         .catch((err) => {
//           throw Error;
//         });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         // err: err,
//       });
//     });
// };

module.exports = {
  createNewComment,
};
