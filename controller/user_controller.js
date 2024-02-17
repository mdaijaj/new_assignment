const UserDetail = require('../models/user_schema')
const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.register = async (req, res) => {
  const {
    username,
    email,
    mobile,
    password,
    status
  } = req.body;

  if(!email || !mobile || !username){
    return res.status(400).send({message: "please Input these value"})
  }

  try {
  const salt = await Bcrypt.genSalt(10);
  let hashedPassword;
  if(password){
    hashedPassword = await Bcrypt.hash(password, salt);
    console.log("hashedPassword", hashedPassword)
  }
    const UserdetailData = await UserDetail.create({
      username,
      email,
      mobile,
      password: hashedPassword,
      status
    })
    return res.status(200).send({
      message: "create successfully!", data: UserdetailData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserdetailData."
    });
  }
}


//signin user
exports.signin= async (req,res)=>{
  try{
      const {email, password}=req.body;
      if(!password || !email){
          res.status(400).send("please fill the data...");
      }
      let userdata =await UserDetail.findOne({email: email})
      console.log("userdata", userdata)
      if(userdata){
          const isMatch=await Bcrypt.compare(password, userdata.password);
          if(!isMatch){
              return res.status(400).send({error: "Invalid Credentials", data: null})
          }

          // console.log("encrypted password match success!")
          let token =await jwt.sign({ userdata: userdata }, process.env.SECRET || "aijajkhan", {expiresIn: 86400 }); // expires in 24 hours
          
          // const token = await userdata.generateAuthToken();
          res.cookie("jwtToken", token, {
              expires: new Date(Date.now()+ 300000000),
              httpOnly: true
          });
          res.send({
              token: token,
              userInfo: userdata,
              status: 200,
              message: "login Success"
          })
      }else{
          res.status(400).send({error: "email not verified please email verified...", code: 403})
      }     
  }
  catch(err){
      console.log(err.message)
      res.send("there is problem to login...", err.message)
  } 
}


exports.getUserList = async (req, res) => {
  try {
    const UserdetailData = await UserDetail.find({status: true})
    console.log("UserdetailData", UserdetailData)
    if (UserdetailData.length>0) {
      res.status(200).send({ message: "get all UserdetailData list", data: UserdetailData })
    }else{
      res.status(204).send({ message: "User not found", data: UserdetailData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.getUserDetails = async (req, res) => {
  const userid=req.params.id
  try {
    const restData = await UserDetail.findById({
      _id: userid, status: true
    })
    if (!restData || restData == undefined) {
      return res.send("not found restaurant")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.editUserDetails = async (req, res) => {
  const userid=req.params.id
  try {
    const userdata = await UserDetail.find({ _id: userid });
    if (userdata) {
      const updateData = await UserDetail.updateOne({ _id: userid }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}