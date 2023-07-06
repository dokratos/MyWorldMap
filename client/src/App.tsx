import { useState, useEffect } from 'react'
import { fetchLocations, selectLocation, postNewLocation } from './slices/locationSlice.ts'
import { useAppDispatch, useAppSelector } from './slices/hooks.ts'
// import './App.css'
import axios from 'axios'
import { Map } from './components/Map'
import Gallery from './components/Gallery'
import Location from './type'

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectLocation)
  const status = useAppSelector(state => state.location.status);
  // const [list, setList] = useState<Location[]>([] as Location[]);
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
    const newLocation = await axios.post("http://localhost:8080/api/locations", { 
      name: formData.name,
      country: formData.country,
      year: formData.year,
      type: formData.type
    });
    const post: Location = await newLocation.data;
    dispatch(postNewLocation(post))
  }

 useEffect(() => {
  //  const getResults = async () =>  {
  //    const results = await axios.get("http://localhost:8080/api/locations");
  //    setList(results.data);
  //  }
  //  getResults();
  if (status === 'idle') {
    dispatch(fetchLocations());
  }
 }, [status])

  return (
    <>
      <Map locations={list}/>
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
      <Gallery locationList={list}/>
    </>
  )
}

export default App
