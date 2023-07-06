import axios from 'axios';
import React, { useState } from 'react'



const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    year: '',
    type: ''
  })

  const { name, country, year, type } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    return await axios.post("http://localhost:8080/api/locations", { 
      name: formData.name,
      country: formData.country,
      year: formData.year,
      type: formData.type
    });
  }

  return (
    <form onSubmit={submit}>
      <input
      type='text'
      name='name'
      value={name}
      placeholder='Location..'
      onChange={e => onChange(e)}
      />
      <input
      type='text'
      name='country'
      value={country}
      placeholder='Specify the country'
      onChange={e => onChange(e)}
      />
      <input 
      value={year}
      name='year'
      placeholder='When was it?'
      onChange={e => onChange(e)}
      />
      <select 
      value={type}
      name='type'
      onChange={e => onSelect(e)}>
        <option>Home</option>
        <option>Sea</option>
        <option>Nature</option>
        <option>City</option>
      </select>
      <button>ADD</button>
    </form>
  )
}

export default Form