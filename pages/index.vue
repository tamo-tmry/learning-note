<template>
    <p>今日学んだことを書いてね</p>
    <MessageContainer v-show="hasTalk" :messages="messages" />
    <MessageForm
        :isRequesting="isRequesting"
        @register="register"
        @gotoCompletePage="gotoCompletePage"
    />
</template>

<script setup lang="ts">
import { ref } from '#imports'
import OpenAI from 'openai'
import { MessageType } from '~/types/Message'
const learned = ref('')
const isRequesting = ref(false)
const runtimeConfig = useRuntimeConfig()
const talkList = ref<any[]>([
    { role: 'system', content: runtimeConfig.public.systemMessage },
])

const MAX_REQUEST_COUNT = 3

const openai = new OpenAI({
    apiKey: runtimeConfig.public.apiKey,
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

const requestCount = computed(() => {
    return talkList.value.filter((talk) => talk.role === 'user').length
})

const gotoCompletePage = () => {
    navigateTo('/complete')
}
</script>
