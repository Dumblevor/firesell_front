
const devUrl = '/api'
const prodUrl = "https://firesell.herokuapp.com/api"
const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl

export default baseUrl