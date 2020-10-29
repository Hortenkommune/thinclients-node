var express = require('express');
var router = express.Router();
var ThinClientModel = require('../models/thinclient');
var GroupModel = require('../models/group');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var clients = await ThinClientModel.find().exec();
  var groups = await GroupModel.find().exec();
  res.render('index', { title: 'ThinClient(s)', clients: clients, groups: groups });
});

router.get("/thinstation.conf.group-:name", async (request, response) => {
  try {
      var group = await GroupModel.findOne({ name: request.params.name }).exec();
      var output = 'SCREEN_RESOLUTION="' + group.resolution + '"\nXRANDR_OPTIONS="dualscreen"';
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
