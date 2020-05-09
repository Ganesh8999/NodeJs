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
  const title = req.body.title;
  const content = req.body.content;
  // create post in db
  res.status(201).json({
    messsage: "Post created successfully !!",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      imageUrl: "images/avengers.jpg",
      creator: {
        name: "Ganesh Singh",
      },
      createdAt: new Date(),
    },
  });
};
