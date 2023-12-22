import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    faq: [{ question: "", answers: ["", ""] }],
  });

  const [generatedUsername, setGeneratedUsername] = useState("");
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleInputChange = (field, answerIndex, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedFAQ = [...prevFormData.faq];
      if (field === 'answers') {
        updatedFAQ[0].answers[answerIndex] = value;
      } else if (field === 'question') {
        updatedFAQ[0].question = value;
      } else {
        
        return {
          ...prevFormData,
          [field]: value,
        };
      }
  
      return {
        ...prevFormData,
        faq: updatedFAQ,
      };
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://slate-gray-crocodile-slip.cyclic.app/form/create",
        formData
      );
      const { newForm } = response.data;

      setGeneratedUsername(newForm.userName);
      setForms([...forms, newForm]);
      setFormData({
        name: "",
        description: "",
        faq: [{ question: "", answers: ["", ""] }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const response = await axios.get("https://slate-gray-crocodile-slip.cyclic.app/form/");
      setForms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>

          <label>
            Question:
            <input
              type="text"
              name="question"
              value={formData.faq[0].question}
              onChange={(e) => handleInputChange("question", 0, e)}
            />
          </label>

          <label>
            Answer 1:
            <input
              type="text"
              name="answers1"
              value={formData.faq[0].answers[0]}
              onChange={(e) => handleInputChange("answers", 0, e)}
            />
          </label>

          <label>
            Answer 2:
            <input
              type="text"
              name="answers2"
              value={formData.faq[0].answers[1]}
              onChange={(e) => handleInputChange("answers", 1, e)}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>

      <h2>Forms Data</h2>

      <input
        className="search"
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>FAQ</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {filteredForms.map((form) => (
            <tr key={form._id}>
              <td>{form.name}</td>
              <td>{form.description}</td>
              <td>
                <ul>
                  {form.faq.map((faq, index) => (
                    <li key={index}>
                      <strong>Question:</strong> {faq.question} <br />
                      <strong>Answer 1:</strong> {faq.answers[0]} <br />
                      <strong>Answer 2:</strong> {faq.answers[1]}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{form.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
