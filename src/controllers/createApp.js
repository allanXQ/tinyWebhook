const { Apps } = require("@models");
const Services = require("@services");

const createApp = async (req, res) => {
  try {
    const { name, webhookUrl } = req.body;

    await Services.create(Apps, { name, webhookUrl });
    return res.status(200).json({
      message: "App created successfully",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createApp };
