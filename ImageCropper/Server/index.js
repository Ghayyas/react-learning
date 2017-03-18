/// <reference path="typings/index.d.ts" />
"use strict";
exports.__esModule = true;
var express = require("express");
var cloudinary = require("cloudinary");
var bodyParser = require("body-parser");
var cors = require("cors");
var fileUpload = require("express-fileupload");
var port = process.env.PORT || 3001;
var app = express();
/**
 * @param  {} cors(
 * @param  {} ;app.use(fileUpload(
 * @param  {true}} ;app.use(bodyParser.urlencoded({extended
 */
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * @param  {'teamclouder'} {cloud_name
 * @param  {'498865267872835'} api_key
 * @param  {'GTaODjdFAvdPlWlkKe9TABp-qiA'}} api_secret
 */
cloudinary.config({
    cloud_name: 'teamclouder',
    api_key: '498865267872835',
    api_secret: 'GTaODjdFAvdPlWlkKe9TABp-qiA'
});
/**
 * @param  {} '/'
 * @param  {Request} (req
 * @param  {Response} res
 */
app.get('/', function (req, res) {
    res.json({ sucess: true, status_code: 200, _body: "hello world" });
});
/**
 * @param  {} "/api/post"
 * @param  {any} function(req
 * @param  {Response} res
 */
app.put("/api/post", function (req, res) {
    try {
        var url = req.files.img.data;
        cloudinary.uploader.upload_stream(function (result) {
            res.json({ success: true, status_code: 200, _body: result });
        }).end(url);
    }
    catch (e) {
        res.json({ success: false, status_code: 500, _body: e.message }); //Bad Request
    }
});
/**
 * @param  {} port
 * @param  {} (
 * @param  {} =>{console.log('Serverisstarted..'
 * @param  {} ;}
 */
app.listen(port, function () {
    console.log('Server is started..');
});
