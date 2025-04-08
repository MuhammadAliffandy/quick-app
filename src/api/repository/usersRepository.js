import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))


export const getUsers = async () => {
    await delay()
    const response = await PROVIDER_GET(`users`)
    return response
}

export const getUser = async (id) => {
    await delay()
    const response = await PROVIDER_GET(`users/${id}`)
    return response
}

export const updateUser = async (id ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`users/${id}`,data)
    return response
}

export const createUser = async (data) => {
    await delay()
    const response = await PROVIDER_POST(`users`,data)
    return response
}

export const deleteUser = async (id) => {
    await delay()
    const response = await PROVIDER_DELETE(`users/${id}`)
    return response
}