const { Apps } = require("@models");
const messages = require("@utils");
const Services = require("@services");
const axios = require("axios");

const tinypesaWebhook = async (req, res) => {
  try {
    const stkCallback = req.body.Body.stkCallback;
    const { CallbackMetadata } = req.body.Body.stkCallback;
    if (stkCallback.ResultCode !== 0) {
      return res.status(400).json({ message: messages.depositFailed });
    }
    const [MpesaReceiptNumber] = CallbackMetadata.Item.map(
      (item) => item["Value"]
    );
    const { ExternalReference, ResultCode, ResultDesc, Amount, Msisdn } =
      stkCallback;

    const currentApp = await Services.findOne(Apps, {
      name: ExternalReference,
      active: true,
    });

    await axios.post(currentApp.webhookUrl, {
      Msisdn,
      Amount,
      MpesaReceiptNumber,
      ResultCode,
      ResultDesc,
    });
    return 0;
  } catch (error) {
    throw error;
  }
};

module.exports = { tinypesaWebhook };
