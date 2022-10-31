import axios from 'axios'
const TOKEN = process.env.REACT_APP_FINNHUB_KEY

// This export will automatically include the basue URL for the finnHub API, so we don't have to keep coding that in to everything we do
export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    // The params for token will be included with the finnHub axios instance, so we don't have to include it in the fetch request used wherever in the program that we call it
    params: {
        token: TOKEN
    }
})