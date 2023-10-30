const router = require("express").Router();
const { tinypesaWebhook } = require("@controllers");

const { errorHOC } = require("@utils");

router.post("/webhook", errorHOC(tinypesaWebhook));

module.exports = router;
