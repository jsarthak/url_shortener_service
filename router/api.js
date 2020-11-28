const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const URL = require("../models/url");
const config = require("config");
const shortid = require("shortid");

// @route      POST /api/url/short
// @desc       Create short URL
router.post("/short", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseURL");

  // check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json("Invalid base url");
  }

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await URL.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        // Create url code
        const urlCode = shortid.generate();
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        return res.json(url);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json("Server Error");
    }
  } else {
    return res.status(400).json("Invalid URL");
  }
});

// @route      GET /:code
// @desc       Get the information about the url
router.get("/:code", async (req, res) => {
  try {
    const url = URL.findOne({ urlCode: req.params.code });
    if (url) {
      return res.json(url);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

module.exports = router;
