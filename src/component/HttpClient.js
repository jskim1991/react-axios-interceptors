import axios from 'axios'

export const get = async (path) => {
    const { data } = await axios.get(path)
    return data
}

export const setupResponseInterceptor = (navigate) => {
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 404) {
                navigate('/error')
            } else {
                return Promise.reject(error)
            }
        }
    )
}
