const Tracker = require("../models/trackerModel");
const Profile = require("../models/profileModel");
const UserStats = require("../models/userStatsModel");

// ==========================
// GET Tracker Hari Ini
// ==========================
exports.getTodayTracker = async (req, res) => {

    try {

        const userId = req.user.userId;

        const profile = await Profile.getProfileByUserId(userId);

        if (profile.length === 0) {
            return res.status(404).json({
                message: "Profile tidak ditemukan"
            });
        }

        const profileId = profile[0].profiles_id;

        const tanggal = new Date().toISOString().split("T")[0];

        let tracker = await Tracker.getTodayTracker(
            profileId,
            tanggal
        );

        // Jika belum ada tracker hari ini, buat otomatis
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
            message: "Tracker hari ini berhasil diambil",
            data: tracker[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ==========================
// Checklist Sholat
// ==========================
exports.checkSholat = async (req, res) => {

    try {

        const { sholat } = req.body;

        const allowedFields = {
            subuh: "sholat_subuh",
            dzuhur: "sholat_dzuhur",
            ashar: "sholat_ashar",
            maghrib: "sholat_maghrib",
            isya: "sholat_isya"
        };

        if (!allowedFields[sholat]) {

            return res.status(400).json({
                message: "Jenis sholat tidak valid"
            });

        }

        const userId = req.user.userId;

        const profile = await Profile.getProfileByUserId(userId);

        const profileId = profile[0].profiles_id;

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

        await Tracker.updateSholat(
            tracker[0].tracker_id,
            allowedFields[sholat]
        );

        await UserStats.addReward(
    profileId,
    10,
    5
);

        res.json({
            message: `${sholat} berhasil dicentang`
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ==========================
// History Tracker
// ==========================
exports.getHistory = async (req, res) => {

    try {

        const userId = req.user.userId;

        const profile = await Profile.getProfileByUserId(userId);

        const profileId = profile[0].profiles_id;

        const history = await Tracker.getHistory(
            profileId
        );

        res.json({
            message: "History berhasil diambil",
            data: history
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};