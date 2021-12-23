const express = require("express");
const router = express.Router();

var fs = require("fs");

const city = require("../models/city.model");
const vlog = require("../models/vlog.model");
const upload = require("../midlleware/file-upload")

const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (user) {
      return res.send(user);
    }
    req.body.img = req.file.filename;
    user = await User.create(req.body);
    console.log(user);
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/vlog", upload.single("img"), async (req, res) => {
  let user;

  try {
    if (req.file) {
      req.body["img"] = req.file.path;
      console.log(req.body)
    }
   console.log(req.body);
    user = await vlog.create(req.body);
    return res.send(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});
/////////////////////////////////////////////////////////////////

router.get("/blog/:ID", async (req, res) => {
  try {
    console.log(req.params.ID);
    const user = await vlog.findById(req.params.ID).populate("user").exec();

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});
////////////////////////////////////////////////////

router.patch("/blog/:ID", async (req, res) => {
  try {
    console.log(req.params.ID);
    //let text = ;
   console.log(req.body)
    
    const user = await vlog.findByIdAndUpdate(req.params.ID, req.body).exec();
    console.log(user)
  
   
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});

/////////////////////////////////////////////////

router.delete("/blog/:ID", async (req, res) => {
  try {
    console.log(req.params.ID);
    const user = await vlog.findByIdAndDelete(req.params.ID);
    console.log(user)
    console.log(user.img)
    if(user.img!='false'){
      fs.unlinkSync(user.img);
    }
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});

/////////////////////////////////////////////////

router.get("/onevlog/:ID", async (req, res) => {
  try {
    console.log(req.params.ID);
    const user = await vlog
      .find({ user: req.params.ID })
      .populate("user")
      .exec();

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});

router.get("/vlog", async (req, res) => {
  try {
    //  console.log(req.params.ID)
    const data = await vlog.find().lean().exec();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});
//////////////////////////////////////////////////////////

router.get("/search", async (req, res) => {
  try {
    let find = req.query.search.toLowerCase() || "p";

    let data = await vlog.find({ title: { $regex: find, $options: "i" } });
    return res.send(data);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
