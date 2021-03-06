var express = require('express');
var router = express.Router();
var ThinClientModel = require('../models/thinclient');

router.post("/", async (request, response) => {
    try {
        var thinclient = new ThinClientModel({
            name: request.body.name,
            mac: request.body.mac,
            settings: request.body.settings
        });
        var result = await thinclient.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/", async (request, response) => {
    try {
        var result = await ThinClientModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/:name", async (request, response) => {
    try {
        var thinclient = await ThinClientModel.findOne({ name: request.params.name.toUpperCase() }).exec();
        response.send(thinclient);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/:name", async (request, response) => {
    try {
        var thinclient = await ThinClientModel.findOne({ name: request.params.name.toUpperCase() }).exec();
        if (request.body.settings) {
            thinclient.set({
                settings: request.body.settings
            });
        }
        if (request.body.lastseen) {
            thinclient.set({
                lastseen: request.body.lastseen
            });
        }
        if (request.body.lastknownip) {
            thinclient.set({
                lastknownip: request.body.lastknownip
            });
        }
        if (request.body.wsversion) {
            thinclient.set({
                wsversion: request.body.wsversion
            });
        }
        var result = await thinclient.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete("/:name", async (request, response) => {
    try {
        var result = await ThinClientModel.deleteOne({ name: request.params.name.toUpperCase() }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/id/:id", async (request, response) => {
    try {
        var thinclient = await ThinClientModel.findById(request.params.id).exec();
        response.send(thinclient);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/id/:id", async (request, response) => {
    try {
        var thinclient = await ThinClientModel.findById(request.params.id).exec();
        if (request.body.settings) {
            thinclient.set({
                settings: request.body.settings
            });
        }
        if (request.body.lastseen) {
            thinclient.set({
                lastseen: request.body.lastseen
            });
        }
        if (request.body.lastknownip) {
            thinclient.set({
                lastknownip: request.body.lastknownip
            });
        }
        if (request.body.wsversion) {
            thinclient.set({
                wsversion: request.body.wsversion
            });
        }
        var result = await thinclient.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete("/id/:id", async (request, response) => {
    try {
        var result = await ThinClientModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;