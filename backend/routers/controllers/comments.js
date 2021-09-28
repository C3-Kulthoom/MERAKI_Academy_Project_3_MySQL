const commentsModel = require("./../../db/models/comments");
const articlesModel = require("../../db/models/articles");

const createNewComment = (req, res) => {
  const { comment, commenter } = req.body;
  const id = req.params.id;
  const newComment = new commentsModel({
    comment,
    commenter,
  });

  newComment
    .save()
    .then((result) => {
      articlesModel
        .findByIdAndUpdate(id, { $push: { comments: result._id } })
        .then((done) => {
          console.log(done);
          res.status(201).json({
            success: true,
            message: `The new comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          throw Error;
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

module.exports = {
  createNewComment,
};
