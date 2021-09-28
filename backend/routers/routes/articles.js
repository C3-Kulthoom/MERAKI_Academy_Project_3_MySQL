const express = require("express");

// controllers
const {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");
const { createNewComment } = require("./../controllers/comments");

// middlewares
const authentication = require("../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

// router
const articlesRouter = express.Router();

// 			routes
//get - post  http://localhost:5000/articles/
//get -       http://localhost:5000/articles/search_1?author=2
//get -       http://localhost:5000/articles/search_2?id=2
//put -       http://localhost:5000/articles/2
//delete -    http://localhost:5000/articles/2
//delete -    http://localhost:5000/articles

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2", getAnArticleById);
articlesRouter.post("/", authentication, createNewArticle);
articlesRouter.put("/:id", updateAnArticleById);
articlesRouter.delete("/:id", deleteArticleById);
articlesRouter.delete("/", deleteArticlesByAuthor);

//post  http://localhost:5000/articles/22/comments/
articlesRouter.post(
  "/:id/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);

module.exports = articlesRouter;
