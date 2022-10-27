import axios from 'axios'

// This export will automatically include the basue URL for the finnHub API, so we don't have to keep coding that in to everything we do
export default axios.create({
    baseURL: 'https://finnhub.io/api/v1'
})