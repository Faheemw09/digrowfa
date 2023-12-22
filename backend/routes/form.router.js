const express = require("express");
const { FormModel } = require("../model/Form.model");

const formrouter = express.Router();

formrouter.post("/create", async (req, res) => {
  try {
    const { name, description, faq, } = req.body;

    let userName;
    let isUnique = false;

    while (!isUnique) {
      userName = generateUniqueUserName(name);
      const existingForm = await FormModel.findOne({ userName });
      if (!existingForm) {
        isUnique = true;
      }
    }

    const newForm = new FormModel({
      name,
      description,
      faq,
      userName,
    });

    await newForm.save();
    res.status(201).json({ newForm});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

formrouter.get("/", async (req, res) => {
  try {
    const forms = await FormModel.find();
    res.status(200).send(forms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

function generateUniqueUserName(name) {
  const timestamp = Date.now();
  const uniqueUserName = `${name.replace(/\s+/g, "")}_${timestamp}`;

  return uniqueUserName;
}

module.exports = { formrouter };
