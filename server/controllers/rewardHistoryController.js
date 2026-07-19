const Reward = require("../models/rewardHistoryModel");
const Profile = require("../models/profileModel");

// Ambil semua reward user
exports.getHistory = async (req, res) => {

    try {

        const profile = await Profile.getProfileByUserId(
            req.user.userId
        );

        if (profile.length === 0) {
            return res.status(404).json({
                message: "Profile tidak ditemukan"
            });
        }

        const history = await Reward.getByProfile(
            profile[0].profiles_id
        );

        res.json({
            message: "Riwayat reward berhasil diambil",
            data: history
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};