const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ message: "all posts fetched ", posts: posts });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  // res.json({
  //   posts: posts,
  // });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("validation failed, entered data is incorrect");
  //   error.statusCode = 422;
  //   throw error;
  // }

  // if (!req.file) {
  //   const error = new Error("No image provided");
  //   error.statusCode = 422;
  //   throw error;
  // }

  // const imageUrl = req.file.path;
  // console.log("imageUrl " + imageUrl);

  //const imageUrl = req.file.path.replace("\\", "/");

  const title = req.body.title;
  const content = req.body.content;
  console.log("content" + content);

  const post = new Post({
    title: "TITLE",
    content: "DAKFAFAFAFAFSA",
    imageUrl: "images/avengers.jpg",
    creator: {
      name: "Ganesh Singh",
    },
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully !!",
        post: result,
      });
    })
    .catch((error) => {
      // console.log(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);

  Post.findById(postId)
    .then((post) => {
      console.log("my post " + post);

      if (!post) {
        const error = new Error("This  post is not available");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: "Post fetched !!!",
        post: post,
      });
    })
    .catch((error) => {
      console.log(error);

      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const error = new Error("validation failed, entered data is incorrect");
  //   error.statusCode = 422;
  //   throw error;
  // }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("could not find post");
        error.statusCode = 422;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        deleteImage(post.imageUrl);
      }

      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "post updated",
        post: {
          title: "TITLE1",
          content: "DAKFNNNNNNNNNNFAFAFSA",
          imageUrl: "images/avengers.jpg",
          creator: {
            name: "Ganesh Singh",
          },
        },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const deleteImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
