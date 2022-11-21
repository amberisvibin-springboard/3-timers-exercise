import React, { useState } from "react";

function NewBoxForm(props) {
  const INITIAL_STATE = {
    width: 100,
    height: 100,
    color: "#000000",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.addBox(formData.width, formData.height, formData.color);
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <p>NewBoxForm</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="width">Width:</label>
        <input
          name="width"
          type="number"
          value={formData.width}
          onChange={handleChange}
        />
        <label htmlFor="height">Height:</label>
        <input
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
        />
        <label htmlFor="color">Color (In hex):</label>
        <input
          name="color"
          type="text"
          value={formData.color}
          onChange={handleChange}
        />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
