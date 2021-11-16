import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const object = await axios.get(baseUrl + '?id=' + id)
  const newObject = { content: object.data[0].content, id: id, votes: object.data[0].votes + 1 }
  const response = await axios.put(baseUrl + '/' + id, newObject)
  return response.data
}

export default {
  getAll,
  createNew,
  voteAnecdote
}