const Uji = require("../models/ujiHafalanModel");
const Profile = require("../models/profileModel");
const UserStats = require("../models/userStatsModel");
const RewardHistory = require("../models/rewardHistoryModel");

exports.getMyUjian = async (req,res)=>{

    try{

        const profile = await Profile.getProfileByUserId(
            req.user.userId
        );

        const data = await Uji.getByProfile(
            profile[0].profiles_id
        );

        res.json({

            message:"Data ujian berhasil diambil",

            data

        });

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

exports.startUjian = async (req,res)=>{

    try{

        const profile = await Profile.getProfileByUserId(
            req.user.userId
        );

        const id = await Uji.create(

            profile[0].profiles_id,

            req.body.bacaan_id

        );

        res.json({

            message:"Ujian berhasil dibuat",

            uji_hafalan_id:id

        });

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

exports.lulus = async (req,res)=>{

    try{

        const data = await Uji.getById(
            req.params.id
        );

        if(data.length===0){

            return res.status(404).json({
                message:"Data ujian tidak ditemukan"
            });

        }

        const ujian = data[0];

        await Uji.updateStatus(

            ujian.uji_hafalan_id,

            "LULUS",

            req.user.userId

        );

        await UserStats.addReward(

            ujian.profiles_id,

            20,
            ujian.reward_coins

        );

        await RewardHistory.create(
    ujian.profiles_id,
    "Lulus Uji Hafalan",
    ujian.reward_coins
);

        res.json({

            message:"Ujian berhasil diluluskan",

            reward:{

                xp:20,
                coins:ujian.reward_coins

            }

        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:err.message
        });

    }

};

