/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START functionsimport]
const functions = require('firebase-functions');
// [END functionsimport]
// [START additionalimports]
// Moments library to format dates.
const moment = require('moment');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});
// [END additionalimports]

// [START all]
/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` vaue in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.date = functions.https.onRequest((req, res) => {
// [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  cors(req, res, () => {
  // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // [START sendResponse]
    const formattedDate = moment().format(format);
    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
});
// [END all]

/* var request = require("request");

var parseMyAwesomeHtml = function(html) {
  console.log(html);
};

request("http://www.chabas.gob.ar/ema/mb1.htm", function (error, response, body) {
  if (!error) {
    parseMyAwesomeHtml(body);
  } else {
    console.log(error);
  }
});
 */

var express = require('express');
var http = require("http");
var https = require("https");
var htmlparser = require("htmlparser2");
var router = express.Router();

router.get("/fetch", function (req, res, next) {
  if (req.query) {
    if (req.query.url === undefined) {
      res.send({ message: "url cannot be undefined" });
    }
    var urlPrefix = req.query.url.match(/.*?:\/\//g);
    req.query.url = req.query.url.replace(/.*?:\/\//g, "");
    var options = {
      hostname: req.query.url
    };

    if (urlPrefix !== undefined && urlPrefix !== null && urlPrefix[0] === "https://") {
      options.port = 443;
      https.get(options, function (result) {
        processResponse(result);
      }).on('error', function (e) {
        res.send({ message: e.message });
      });
    } else {
      options.port = 80;
      http.get(options, function (result) {
        processResponse(result);
      }).on('error', function (e) {
        res.send({ message: e.message });
      });
    }

    var processResponse = function (result) {
      var data = "";
      result.on("data", function (chunk) {
        data += chunk;
      });
      var tags = [];
      var tagsCount = {};
      var tagsWithCount = [];
      result.on("end", function (chunk) {
        var parser = new htmlparser.Parser({
          onopentag: function (name, attribs) {
            if (tags.indexOf(name) === -1) {
              tags.push(name);
              tagsCount[name] = 1;
            } else {
              tagsCount[name]++;
            }
          },
          onend: function () {
            for (var i = 0; i < tags.length; i++) {
              tagsWithCount.push({ name: tags[i], count: tagsCount[tags[i]] });
            }
          }
        }, { decodeEntities: true });
        parser.write(data);
        parser.end();
        res.send({ website: req.query.url, port: options.port, data: data, tags: tagsWithCount });
      });
    }

  }
});