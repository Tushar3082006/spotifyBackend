const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const {uploadFile} = require("../service/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music_id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })
 
}

async function createAlbum(params) {
    try {
        const token = req.cooikies.token;
        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist" ){
            return res.status(403).json({message: "You are not allowed to access the music"});
        }

        const { title, musicIds }= req.body;
        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musicIds
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized"})
    } 
    
}

module.exports = {createMusic, createAlbum };