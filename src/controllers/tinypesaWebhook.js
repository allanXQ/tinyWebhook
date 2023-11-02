const { Apps } = require("@models");
const messages = require("@utils");
const Services = require("@services");
const axios = require("axios");

const tinypesaWebhook = async (req, res) => {
  try {
    console.log(req.body);
    const stkCallback = req.body.Body.stkCallback;
    const { CallbackMetadata } = req.body.Body.stkCallback;
    let MpesaReceiptNumber;
    CallbackMetadata.Item.forEach(function (item) {
      if (item.Name === "MpesaReceiptNumber") {
        MpesaReceiptNumber = item.Value;
      }
    });
    const { ExternalReference, ResultCode, ResultDesc, Amount, Msisdn } =
      stkCallback;

    const currentApp = await Services.findOne(Apps, {
      name: ExternalReference,
      active: true,
    });

    if (currentApp) {
      await axios
        .post(currentApp.webhookUrl, {
          Msisdn,
          Amount,
          MpesaReceiptNumber,
          ResultCode,
          ResultDesc,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return 0;
  } catch (error) {
    throw error;
  }
};

module.exports = { tinypesaWebhook };
