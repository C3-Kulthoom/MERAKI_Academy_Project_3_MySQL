const connection  = require("../../db/db");

// this function return all articles
const getAllArticles = (req, res) => {
const query = `SELECT * FROM articles WHERE is_deleted=0 `

connection.query(query , (error, result)=>{
  if (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error,
    });
  }
  res.status(200).json({success : true , message:"all  articles ", result:result});
});
};






//   articlesModel
//     .find({})
//     .populate("author", "firstName lastName")
//     .populate({
//       path: "comments",
//       populate: { path: "commenter",select: 'firstName lastName -_id', model: "User" },
//     })
//     .then((articles) => {
//       res.status(200).json({
//         success: true,
//         message: `All the articles`,
//         articles,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         // err: err,
//       });
//     });
// };

//this function get articles by author return all his articles
const getArticlesByAuthor = (req, res) => {
  let authorid = req.body.author_id ;
  const query = `SELECT * FROM articles
  WHERE author_id =? AND is_deleted=0`
const data =[authorid]
connection.query(query , data,  (err, result)=>{
  if (err) {
    res.status(404).json({
      success: false,
      message: `Server Error`,
      error:err})
}
res.status(200).json({success : true ,
  msg:`all ${authorid} articles : `
  ,result:result})
})
}



//this function get one article by specific id and return the specific article
const getAnArticleById = (req, res) => {
  let id = req.query.id;
  articlesModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The article ${id} `,
        article: result,
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

//this function creat new article by take the info from the req the body and push to array then it return the new one
const createNewArticle = (req, res) => {
  const { 
    title,
    description,
    author_id,
      } = req.body;
  const queryString = `INSERT INTO articles (
    title,
    description,
    author_id
  
  ) VALUES(?,?,?)`;
  const data = [
    title,
    description,
    author_id, 
     ];
  connection.query(queryString, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err,
      });}
      res.status(200).json({success : true , message:"new article created", result:result});
    });
  };
  


//this function update article by it's id
const updateAnArticleById = (req, res) => {
  
  const id = req.params.id;
  const {description,title} =req.body
  const query = `UPDATE articles SET  title = "${title}" , description="${description}" WHERE id= ${id}`;
// const data = [id]
connection.query(query,(err,result)=>{
if (err) {
  console.log(err.response);
  return;
}
res.status(200).json({
  success : true ,
   message: `article ${id} updated `,
result:result
  });
});
};
 

//this function delete a specific article using the id
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const query =  `UPDATE articles SET is_deleted="1"  WHERE id = ${id}`;
  const data = [id]
  connection.query(query,data,(err,result)=>{
  if (err) {
    console.log(err.response);
    return;
  }
  res.status(200).json({
    success : true ,
     message: `article ${id} deleted `,
  result:result
    });
  });
  };












//   const id = req.params.id;
//   articlesModel
//     .findByIdAndDelete(id)
//     .then((result) => {
//       if (!result) {
//         return res.status(404).json({
//           success: false,
//           message: `The Article => ${id} not found`,
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: `Success Delete atricle with id => ${id}`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         // err: err,
//       });
//     });
// };

//this function delete all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  const {firstName} = req.body
  const query = `SELECT id  FROM users
  WHERE firstName = ${firstName}  ` 
  connection.query(query,(err,result)=>{
  if (err) {
    console.log(err.response);
    return;
  }
const id = result[0].id 
 const query = `UPDATE articles SET is_deleted="1"  WHERE author_id= ${id}`
 onnection.query(query, (error, result, fields) => {
  if (error) {
    console.log(error.response);
    return;
  }
  res
    .status(200)
    .json({
      success: true,
      message: " article deleted by id   ",
      result: result,
    });
});
});
};
//   articlesModel
//     .deleteMany({ author })
//     .then((result) => {
//       if (!result.deletedCount) {
//         return res.status(404).json({
//           success: false,
//           message: `The Author not found`,
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: `Success Delete atricles for the author => ${author}`,
//         result,
//       });
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
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
