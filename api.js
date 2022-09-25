const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/register",async(req,res)=>{
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!(email && password && firstName && lastName)){
            res.send("All input is required");
        }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // create token

        const token = jwt.sign(
            {user_id:user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        //save user token
        user.token = token;

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
    }
});

router.post("/login",async(req,res)=>{
      try {
        const { email, password } = req.body;
        if(!(email && password)){
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});
        if(user &&(await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {user_id:user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (error) {
        console.log(error);
      }

router.post("follow/:id",async(req,res)=>{
        try {
            const { id } = req.params.id;
            const getfollow = await User.findOneById({_id:id},{follow});
            res.send(getfollow);
        } catch (error) {
            console.log(error);
        }
      })

router.post("unfollow/:id",async(req,res)=>{
        try {
            const { id } = req.params.id;
            const getunfollow = await User.findOneById({_id:id},{unfollow});
            res.send(getunfollow);
        } catch (error) {
            console.log(error);
        }
      })
router.get("/user",async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email,password){
            const getuser = await User.find({firstName,LastName},{follow},{following});
            res.send(getuser);
        }
    } catch (error) {
        console.log(error);
    }
  })
  router.post("/posts",async(req,res)=>{
    try {
        const {title,description} = req.body;
        const getinfo = await User.find({title:title},{description:description});
        res.send(getinfo);
    } catch (error) {
        console.log(error);
    }
  })
  
router.delete("/posts/:id",async(req,res)=>{
     try {
        const {id} = req.params.id;
        const removePost = await User.findByIdAndDelete({id},{post});
        res.send(removePost);
     } catch (error) {
        console.log(error);
     }
}) 

router.post("/like/:id",async(req,res)=>{
    try {
        const {_id} = req.params.id;
        const getlike = await User.findById({_id},{like:1});
        res.send(getlike);
    } catch (error) {
        console.log(error);
    }
})

router.post("/unlike",async(req,res)=>{
     try {
        const {_id} = req.params.id;
        const getunlike = await User.findById({_id},{unlike:1});
        res.send(getunlike);      
     } catch (error) {
        console.log(error);
     }
})

router.post("/comment/:id",async(req,res)=>{
    try {
        const { comment } = req.body;
        const cmntId = req.params.id
        const getcommentId = await User.find({comment},{cmntId});
        res.send(getcommentId);
    } catch (error) {
        console.log(error);
    }
})

router.post("/posts/:id",async(req,res)=>{
    try {
        const {_id} = req.params.Id;
        const postDetails = await User.find({_id},{like},{comment});
        res.send(postDetails);
    } catch (error) {
        console.log(error);
    }
})
});




module.exports = router;