import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import Location from '../type';

interface IState  {
  locations: Location[],
  status: string
}

const initialState: IState = {
  locations: [],
  status: 'idle'
}

export const fetchLocations = createAsyncThunk('location/fetchLocations', async () => {
  const results = await axios.get("http://localhost:8080/api/locations");
  return (await results.data) as Location;
})

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    postNewLocation: (state, action) => {
      state.locations = state.locations.concat(action.payload);
    },
    removeLocation: (state, action) => {
      state.locations = state.locations.filter(loc => loc.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.locations = state.locations.concat(action.payload)
      })
  }
})

export const { postNewLocation, removeLocation } = locationSlice.actions;
export const selectLocation = (state: RootState) => state.location.locations;
export default locationSlice.reducer;