<template>
    <MessageContainer :messages="data" />
    <VBtn to="/note">一覧</VBtn>
</template>

<script setup lang="ts">
const route = useRoute()
const httpClient = useHttpClient()

const { data } = await useAsyncData('mountains', async () => {
    const id = route.params.id as string
    const data = await httpClient.getRequestById(id)
    const messages = JSON.parse(data.learning_note)
    return messages.map((message: any) => {
        return {
            text: message.content,
            isMine: message.role === 'user',
        }
    })
})
</script>
