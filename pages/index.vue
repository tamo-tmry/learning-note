<template>
    <p>今日学んだことを書いてね</p>
    <MessageContainer v-show="hasTalk" :messages="messages" />
    <MessageForm
        :isRequesting="isRequesting"
        :hasTalk="!hasTalk"
        @register="register"
        @gotoCompletePage="gotoCompletePage"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OpenAI from 'openai'
import { MessageType } from '~/types/Message'
const httpClient = useHttpClient()
const isRequesting = ref(false)
const runtimeConfig = useRuntimeConfig()
const talkList = ref<any[]>([
    { role: 'system', content: runtimeConfig.public.systemMessage },
])

const openai = new OpenAI({
    apiKey: runtimeConfig.public.openaiApiKey,
    dangerouslyAllowBrowser: true,
})

const register = async (learnedText: string) => {
    isRequesting.value = true
    const completion = await openai.chat.completions.create({
        messages: [...talkList.value, { role: 'user', content: learnedText }],
        model: runtimeConfig.public.model,
    })
    talkList.value.push({ role: 'user', content: learnedText })
    talkList.value.push(completion.choices[0].message)
    isRequesting.value = false
}

const messages = computed((): MessageType[] => {
    return talkList.value
        .filter((talk) => talk.role !== 'system')
        .map((talk) => {
            return {
                text: talk.content,
                isMine: talk.role === 'user',
            }
        })
})

const hasTalk = computed(() => {
    return talkList.value.length > 1
})

const gotoCompletePage = async () => {
    await registerTalkHistory()
    navigateTo('/complete')
}

const nonSystemTalkList = computed(() =>
    talkList.value.filter((talk) => talk.role !== 'system'),
)

const registerTalkHistory = () => {
    const requestBody = JSON.stringify(nonSystemTalkList.value)
    httpClient.sendRequest(requestBody)
}
</script>
