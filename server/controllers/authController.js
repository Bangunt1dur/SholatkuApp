const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");


// REGISTER
exports.register = async (req, res) => {

    console.log("Request masuk");
    console.log(req.body);

    try {

        const {
            email,
            password,
            account_type,
            name,
            pin,
            avatar_url
        } = req.body;


        // cek email
        const existingUser = await User.findByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "Email sudah digunakan"
            });
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password,10);


        // buat user
        const userId = await User.createUser(
            email,
            hashedPassword,
            account_type
        );


        console.log("User berhasil dibuat:", userId);


        // buat profile
        const profileId = await Profile.createProfile(
            userId,
            name,
            pin,
            avatar_url
        );


        console.log("Profile berhasil dibuat:", profileId);


        res.json({
            message:"Register berhasil",
            userId
        });


    } catch(err){

        console.log(err);

        res.status(500).json({
            message:err.message
        });

    }

};




// LOGIN
exports.login = async (req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;


        const users = await User.findByEmail(email);


        if(users.length===0){

            return res.status(404).json({
                message:"Email tidak ditemukan"
            });

        }


        const user = users[0];


        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );


        if(!isMatch){

            return res.status(401).json({
                message:"Password salah"
            });

        }


        res.json({

            message:"Login berhasil",

            user

        });



    }catch(err){

        console.log(err);

        res.status(500).json({
            message:err.message
        });

    }

};