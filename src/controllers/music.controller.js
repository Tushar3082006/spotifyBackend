const musicModel = require("../models/music.model");
const {uploadFile} = require("../service/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
    
    const token = req.cooikies.token ;
    if(!token){
        return res.status(401).json({ message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role != "artitist"){
            return res.status(403).json({ message: " You are not allowed to access the music"});
        }

        const {title} = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

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

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized"});
    }

}

module.exports = {createMusic };