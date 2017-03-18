/// <reference path="typings/index.d.ts" />

import { Request, Response } from 'express';
import * as express from 'express';
import * as cloudinary from 'cloudinary';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ParsedAsText } from 'body-parser';
import * as fileUpload from 'express-fileupload';
import * as path from 'path';
import * as formidable from 'formidable';
import * as fs from 'fs';
import * as multer from 'multer';

declare var process: any;


let port = process.env.PORT || 3001;

const app = express();
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
app.get('/', (req: Request, res: Response) => {
    res.json({ sucess: true, status_code: 200, _body: "hello world" });
});
/**
 * @param  {} "/api/post"
 * @param  {any} function(req
 * @param  {Response} res
 */
app.put("/api/post", function (req: any, res: Response) {
    try {
        var url = req.files.img.data;
        cloudinary.uploader.upload_stream((result) => {
            res.json({ success: true, status_code:200 ,_body: result });
        }).end(url);
    }
    catch (e) {
        res.json({ success: false, status_code:500 ,_body: e.message });  //Bad Request
    }

});
/**
 * @param  {} port
 * @param  {} (
 * @param  {} =>{console.log('Serverisstarted..'
 * @param  {} ;}
 */
app.listen(port, () => {
    console.log('Server is started..');
});