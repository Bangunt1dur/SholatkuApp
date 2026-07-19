const Profile = require("../models/profileModel");
const UserStats = require("../models/userStatsModel");
const Tracker = require("../models/trackerModel");

exports.getDashboard = async (req, res) => {

    try {

        const userId = req.user.userId;

        // Ambil profile
        const profile = await Profile.getProfileByUserId(userId);

        if (profile.length === 0) {
            return res.status(404).json({
                message: "Profile tidak ditemukan"
            });
        }

        const profileData = profile[0];
        const profileId = profileData.profiles_id;

        // Ambil stats
        const stats = await UserStats.getStats(profileId);

        // Ambil tracker hari ini
        const tanggal = new Date().toISOString().split("T")[0];

        let tracker = await Tracker.getTodayTracker(
            profileId,
            tanggal
        );

        if (tracker.length === 0) {

            await Tracker.createTracker(
                profileId,
                tanggal
            );

            tracker = await Tracker.getTodayTracker(
                profileId,
                tanggal
            );

        }

        res.json({

            message: "Dashboard berhasil diambil",

            data: {

                profile: profileData,

                stats: stats.length > 0 ? stats[0] : null,

                tracker: tracker[0]

            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};