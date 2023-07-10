import { useEffect } from 'react'
import { fetchLocations, selectLocation } from './slices/locationSlice.ts'
import { useAppDispatch, useAppSelector } from './slices/hooks.ts'
// import './App.css'
import { Map } from './components/Map'
// import Gallery from './components/Gallery'
import Form from './components/Form.tsx'

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectLocation)
  const status = useAppSelector(state => state.location.status);

 useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchLocations());
  }
 }, [status, dispatch])

  return (
    <>
      <Map locations={list}/>
      <Form />
      {/* <Gallery locationList={list}/> */}
    </>
  )
}

export default App
