var express = require('express');
var router = express.Router();
var TcConfigModel = require('../models/config');


router.get("/", async (request, response) => {
    try {
        var result = await TcConfigModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/", async (request, response) => {
    try {
        var config = new TcConfigModel({
            name: request.body.name,
            value: request.body.value
        });
        var result = await config.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete("/:name", async (request, response) => {
    try {
        var result = await TcConfigModel.deleteOne({ name: request.params.name }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;