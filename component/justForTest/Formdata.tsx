'use client';
import React, {useState} from 'react';

function Apptest() {
  const [formData, setFormData] = useState({
    text: '',
    radio: '',
    checkbox: false,
    select: 'option1',
  });

  const handleTextChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (e: any) => {
    setFormData({
      ...formData,
      radio: e.target.value,
    });
  };

  const handleCheckboxChange = (e: any) => {
    setFormData({
      ...formData,
      checkbox: e.target.checked,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      select: e.target.value,
    });
  };

  return (
    <div>
      <MyForm
        formData={formData}
        onTextChange={handleTextChange}
        onRadioChange={handleRadioChange}
        onCheckboxChange={handleCheckboxChange}
        onSelectChange={handleSelectChange}
      />
    </div>
  );
}

export default Apptest;

const MyForm = ({
  formData,
  onTextChange,
  onRadioChange,
  onCheckboxChange,
  onSelectChange,
}: any) => {
  const handleSubmit = (e: any) => {
    console.log(formData);
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text Input:
        <input
          type='text'
          name='text'
          value={formData.text}
          onChange={onTextChange}
        />
      </label>

      <div>
        <label>
          Radio Option 1:
          <input
            type='radio'
            name='radio'
            value='option1'
            checked={formData.radio === 'option1'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Radio Option 2:
          <input
            type='radio'
            name='radio'
            value='option2'
            checked={formData.radio === 'option2'}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <label>
        Checkbox:
        <input
          type='checkbox'
          name='checkbox'
          checked={formData.checkbox}
          onChange={onCheckboxChange}
        />
      </label>

      <label>
        Select:
        <select name='select' value={formData.select} onChange={onSelectChange}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
        </select>
      </label>

      <button type='submit'>Submit</button>
    </form>
  );
};
