var express = require('express');
var router = express.Router();
var TcConfigModel = require('../models/config');

router.get("/", async (request, response) => {
    try {
        var result = await TcConfigModel.find().exec();
        var output = "";
        result.forEach(element => {
            output +=  element.name + "=" + element.value + "\n";
        });
        var buf = Buffer.from(output, 'binary');
        response.setHeader('Content-type', 'application/octet-stream');
        response.setHeader('Accept-Ranges', 'bytes');
        response.setHeader('Content-Length', buf.length);
        response.setHeader('Cache-Control', 'public, max-age=0');
        response.write(buf, 'binary');
        response.end(null, 'binary');
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;