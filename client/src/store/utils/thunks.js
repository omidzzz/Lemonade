import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=simplyeffedup&limit=4&api_key=f59084f6f83edbe693185eb0ec6b2272&format=json';

export const fetchLast = createAsyncThunk(
    'posts/fetchLast',
    async({},{ getState })=>{
        try{

            const response = await axios.get(`${apiUrl}`);

            return {
                items: [response.data.recenttracks.track]
            }
        } catch(error){
            throw error;
        }
    }
)