exports.getPosts = (req, res, next) => {
  res.json({
    posts: [{ title: "My Posts", content: "This posts is very cool!!!" }],
  });
};

exports.postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // create post in db
  res.status(201).json({
    messsage: "Post created successfully !!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};
