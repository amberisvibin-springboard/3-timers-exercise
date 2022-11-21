import React, { useState } from "react";

function NewTodoForm(props) {
  const INITIAL_STATE = {
    task: "",
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
    props.addTodo(formData.task);
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <p>NewTodoForm</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
        <input
          name="task"
          type="text"
          value={formData.task}
          onChange={handleChange}
        />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
