export const useHttpClient = () => {
    const getRequest = async () => {
        const endPointUrl = useRuntimeConfig().public.endPointUrl
        const apiKey = useRuntimeConfig().public.apiKey
        const response = await fetch(`${endPointUrl}/note`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': apiKey,
            },
        })
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message)
        }
        return responseData
    }

    const getRequestById = async (id: string) => {
        const endPointUrl = useRuntimeConfig().public.endPointUrl
        const apiKey = useRuntimeConfig().public.apiKey
        const response = await fetch(`${endPointUrl}/note/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': apiKey,
            },
        })
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message)
        }
        return responseData
    }

    const sendRequest = async (content: string) => {
        const endPointUrl = useRuntimeConfig().public.endPointUrl
        const apiKey = useRuntimeConfig().public.apiKey
        const response = await fetch(`${endPointUrl}/note`, {
            method: 'POST',
            body: JSON.stringify({ learning_note: content }),
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': apiKey,
            },
        })
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message)
        }
        return responseData
    }
    return {
        getRequest,
        getRequestById,
        sendRequest,
    }
}
