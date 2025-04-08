import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))


export const getMessages = async () => {
    await delay()
    const response = await PROVIDER_GET(`messages`)
    return response
}

export const getMessage = async (id) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${id}`)
    return response
}

export const updateMessage = async (id ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`messages/${id}`,data)
    return response
}

export const createMessage = async (data) => {
    await delay()
    const response = await PROVIDER_POST(`messages`,data)
    return response
}

export const deleteMessage = async (id) => {
    await delay()
    const response = await PROVIDER_DELETE(`messages/${id}`)
    return response
}