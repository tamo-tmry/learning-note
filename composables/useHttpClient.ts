export const useHttpClient = () => {
    const sendRequest = async (content: string) => {
        const endPointUrl = useRuntimeConfig().public.endPointUrl
        const apiKey = useRuntimeConfig().public.apiKey
        console.log(JSON.stringify({ learning_note: content }))
        const response = await fetch(`${endPointUrl}/note`, {
            method: 'POST',
            body: JSON.stringify({ learning_note: content }),
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': apiKey,
            },
        })
        console.log(response)
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message)
        }
        return responseData
    }
    return {
        sendRequest,
    }
}
