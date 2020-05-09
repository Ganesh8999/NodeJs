const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.json({
    posts: [
      {
        _id: "1",
        title: "My Posts",
        content: "This posts is very cool!!!",
        imageUrl: "images/avengers.jpg",
        creator: {
          name: "Ganesh Singh",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     message: "Validation failed",
  //     error: errors.array(),
  //   });
  // }
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
      console.log(error);
    });
};
