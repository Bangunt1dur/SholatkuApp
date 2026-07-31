const UserStats = require("../models/userStatsModel");
const Profile = require("../models/profileModel");

exports.getStats = async (req, res) => {

    try {

        const profile = await Profile.getProfileByUserId(
            req.user.userId
        );

        if (profile.length === 0) {
            return res.status(404).json({
                message: "Profile tidak ditemukan"
            });
        }

        const stats = await UserStats.getStats(
            profile[0].profiles_id
        );

        if (stats.length === 0) {

            await UserStats.createStats(
                profile[0].profiles_id
            );

            const newStats = await UserStats.getStats(
                profile[0].profiles_id
            );

            return res.json({
                message: "Stats berhasil diambil",
                data: newStats[0]
            });
        }

        res.json({
            message: "Stats berhasil diambil",
            data: stats[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};