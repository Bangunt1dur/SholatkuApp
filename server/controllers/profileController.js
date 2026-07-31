const Profile = require("../models/profileModel");

// ==========================
// GET PROFILE
// ==========================
exports.getProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const profile = await Profile.getProfileByUserId(userId);

        if (profile.length === 0) {
            return res.status(404).json({
                message: "Profile tidak ditemukan"
            });
        }

        res.json({
            message: "Profile berhasil diambil",
            profile: profile[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};


// ==========================
// UPDATE PROFILE
// ==========================
exports.updateProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const {
            name,
            avatar_url
        } = req.body;

        await Profile.updateProfile(
            userId,
            name,
            avatar_url
        );

        res.json({
            message: "Profile berhasil diupdate"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};