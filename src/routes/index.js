const router = require("express").Router();
const { tinypesaWebhook, createApp } = require("@controllers");

const { errorHOC } = require("@utils");

router.post("/webhook", errorHOC(tinypesaWebhook));
router.post("/create-app", errorHOC(createApp));

module.exports = router;
