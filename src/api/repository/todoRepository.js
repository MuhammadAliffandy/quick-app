import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))


export const getTodos = async () => {
    await delay()
    const response = await PROVIDER_GET(`todo`)
    return response
}

export const getTodo = async (token ) => {
    await delay()
    const response = await PROVIDER_GET(`todo`, token)
    return response
}

export const updateTodo = async (id ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`todo/${id}`,data)
    return response
}

export const createTodo = async (data) => {
    await delay()
    const response = await PROVIDER_POST(`todo`,data)
    return response
}

export const deleteTodo = async (id) => {
    await delay()
    const response = await PROVIDER_DELETE(`todo/${id}`)
    return response
}