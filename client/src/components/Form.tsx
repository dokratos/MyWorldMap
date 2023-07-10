import axios from 'axios';
import React, { useState } from 'react'
import { postNewLocation } from '../slices/locationSlice.ts'
import { useAppDispatch } from '../slices/hooks.ts'
import Spinner from './Spinner.tsx';


const Form = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    year: '',
    type: "Home"
  })

  const { name, country, year, type } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.length < 2 || formData.country.length < 2) return;
    setIsLoading(true);
    const newLocation = await axios.post("http://localhost:8080/api/locations", { 
      name: formData.name,
      country: formData.country,
      year: formData.year,
      type: formData.type
    });
    const post: Location = await newLocation.data;
    dispatch(postNewLocation(post))
    setIsLoading(false)
    setFormData({
      name: '',
      country: '',
      year: '',
      type: "Home"
    })
  }

  return (
    <form onSubmit={submit}>
      <input
      type='text'
      name='name'
      value={name}
      placeholder='Location..'
      onChange={e => onChange(e)}
      required
      />
      <input
      type='text'
      name='country'
      value={country}
      placeholder='Specify the country'
      onChange={e => onChange(e)}
      required
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
      <button disabled={isLoading}>ADD</button>
      {isLoading && <Spinner />}
    </form>
  )
}

export default Form