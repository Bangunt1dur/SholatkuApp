const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const UserStats = require("../models/userStatsModel");


// =======================
// REGISTER
// =======================
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
        const hashedPassword = await bcrypt.hash(password, 10);

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

console.log("Profile ID:", profileId);

const statsId = await UserStats.createStats(profileId);

console.log("Stats berhasil dibuat:", statsId);

        console.log("Profile berhasil dibuat:", profileId);

        res.json({
            message: "Register berhasil",
            userId
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};


// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const users = await User.findByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({
                message: "Email tidak ditemukan"
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Password salah"
            });
        }

        const token = jwt.sign(
            {
                userId: user.users_id,
                account_type: user.account_type
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.json({
            message: "Login berhasil",
            token,
            user: {
                users_id: user.users_id,
                email: user.email,
                name: user.name,
                account_type: user.account_type
            }
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};


// =======================
// GET DATA USER (ME)
// =======================
exports.me = async (req, res) => {

    res.json({
        message: "Data user berhasil diambil",
        user: req.user
    });

};