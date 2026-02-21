const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const {uploadFile} = require("../service/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
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

async function createAlbum(req, res) {

    const { title, musicIds }= req.body;
    
    const album = await albumModel.create({
        title,
        artist: req.user.id,
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
    
}

async function getAllMusics(req, res) {

    const musics = await musicModel.find();

    res.status(200).json({
        message: "Musics fetched successfully",
        muiscs: musics
    })
}

async function getAllAlbum(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email");

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

async function getAllAlbumById(req, res) {

    const album = await albumModel.findOne(req.params.id).populate("artist", "username email")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })

}

module.exports = {createMusic, createAlbum , getAllMusics, getAllAlbum, getAllAlbumById};