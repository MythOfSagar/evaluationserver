const Router = require("express");
const PostModel = require("../model/post.model");
require("dotenv").config();


const postRouter = Router();
const authenticate = require("../middleware/authenticate.middleware");

postRouter.use(authenticate);

postRouter.get("/", async (req, res) => {
    const query = req.query;
  try {
    const AllPosts =await PostModel.find(query)

    res.send(AllPosts);
  } catch (err) {
    res.send("Error in Post Display");
  }
  });



postRouter.post("/create", async (req, res) => {
  const { title, body, device, userid } = req.body;
  try {
    const newPost = new PostModel({ title, body, device, userid });
    await newPost.save();
    res.send("New Post Created");
  } catch (err) {
    res.send("Error in Post Creation");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const postID = req.params.id;
  const mediapost = await PostModel.findOne({ _id: postID });

  const userIDofpost = mediapost.userid;
  const userIDofuser = req.body.userid;

  try {
    if (userIDofpost !== userIDofuser) {
      res.send("Error in Deletion because you are not authenticated");
    } else {
      await PostModel.findByIdAndDelete(postID);
      res.send("Deleted Successfully");
    }
  } catch (err) {
    res.send("Error in Deletion");
  }
});

postRouter.put("/update/:id", async (req, res) => {
  const postID = req.params.id;
  const updateData = req.body;

  const mediapost = await PostModel.findOne({ _id: postID });

  const userIDofpost = mediapost.userid;
  const userIDofuser = req.body.userid;

  try {
    if (userIDofpost !== userIDofuser) {
      res.send("Error in Updation because you arenot authenticated");
    } else {
      await PostModel.findByIdAndUpdate(postID, { ...updateData });
      res.send("Updated Successfully");
    }
  } catch (err) {
    res.send("Error in Updation");
  }
});


module.exports = postRouter;
