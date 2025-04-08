import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))


export const getGroupMessages = async () => {
    await delay()
    const response = await PROVIDER_GET(`groupMessages`)
    return response
}

export const getGroupMessage = async (id) => {
    await delay()
    const response = await PROVIDER_GET(`groupMessages/${id}`)
    return response
}

export const updateGroupMessage = async (id ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`groupMessages/${id}`,data)
    return response
}

export const createGroupMessage = async (data) => {
    await delay()
    const response = await PROVIDER_POST(`groupMessages`,data)
    return response
}

export const deleteGroupMessage = async (id) => {
    await delay()
    const response = await PROVIDER_DELETE(`groupMessages/${id}`)
    return response
}