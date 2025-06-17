import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchPopularMovies = async (page = 1) => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page }
  })
  return {
    results: data.results,
    totalPages: data.total_pages
  }
}


export const searchMovies = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query }
  })
  return data.results
}

export const getMovieDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY }
  })
  return data
}
