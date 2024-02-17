const PostModel = require('../models/post_schema')

exports.createPost = async (req, res) => {
  const {
    resource_name,
    title,
    description,
    price,
    status,
  } = req.body;

  if(!resource_name || !title || !description){
    return res.status(400).send({message: "please Input these value"})
  }

  try {
    const postdata=await PostModel.findOne({resource_name: resource_name});
    if(postdata){
      return res.status(400).send({message: "this resource_name allready exits"})
    }
    const post_resource = await PostModel.create({
      resource_name,
      title,
      description,
      price,
      status,
    })
    return res.status(200).send({
      message: "create successfully!", data: post_resource
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the postdetailData."
    });
  }
}




exports.getPostList = async (req, res) => {
  try {
    const postdata = await PostModel.find({status: true})
    if (postdata.length>0) {
      res.status(200).send({ message: "get all postdata list", data: postdata })
    }else{
      return res.status(204).send({message: "data not found", data: postdata})
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.getPostDetails = async (req, res) => {
  const postid=req.params.id
  try {
    const postdata = await PostModel.findById({
      _id: postid, status: true
    })
    if (!postdata || postdata == undefined) {
      return res.send("not found postdata")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: postdata
    })
  }
  catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.editPostDetails = async (req, res) => {
  const postid=req.params.id
  try {
    const postdata = await PostModel.findById({ _id: postid });
    if (postdata) {
      const updateData = await PostModel.updateOne({ _id: postid }, { $set: req.body });
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.deletePostDetails = async (req, res) => {
  const postid=req.params.id
  try {
    const postdata = await PostModel.find({ _id: postid });
    if (postdata) {
      const updateData = await PostModel.updateOne({ _id: postid }, { $set: {status: false} });
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully!" })
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}