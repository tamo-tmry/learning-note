<template>
    <h2>振り返り</h2>
    <VList>
        <VListItem v-for="talk in data" :to="`/note/${talk.id}`">{{
            talk.learningNote
        }}</VListItem>
    </VList>
    <VBtn to="/">新規登録</VBtn>
</template>

<script setup lang="ts">
const httpClient = useHttpClient()

const { data } = await useAsyncData('mountains', async () => {
    const data = await httpClient.getRequest()
    const talkList = data.contents.map((content: any) => {
        const learningNote = JSON.parse(content.learning_note)
        const displayLearningNote =
            learningNote[0].content.length > 14
                ? `${learningNote[0].content.substring(0, 15)}...`
                : learningNote[0].content
        return {
            id: content.id,
            learningNote: displayLearningNote,
        }
    })
    return talkList
})
</script>
