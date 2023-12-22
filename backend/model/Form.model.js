const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  faq: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: [
        {
          type: String,
        },
      ],
    },
  ],
  userName: {
    type: String,
    required: true,
    unique: true,
  },
});

const FormModel = mongoose.model("form", formSchema);

module.exports = {
  FormModel,
};
