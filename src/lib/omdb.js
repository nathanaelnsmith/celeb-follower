import axios from 'axios'
const OMDB_KEY = "69448584"
const omdb = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`;

export async function searchByTitle(query) {
  const res = await axios.get(`${omdb}t=${query}`);
  return res;
}

export async function searchByQuery(query) {
  const res = await axios.get(`${omdb}s=${query}`);
  return res;
}

export async function searchByID(id) {
  const res = await axios.get(`${omdb}i=${id}`);
  return res;
}
