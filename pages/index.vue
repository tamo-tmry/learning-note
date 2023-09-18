<template>
    <p>今日学んだことを書いてね</p>
    <MessageContainer v-show="hasTalk" :messages="messages" />
    <VTextarea :disabled="isRequesting" v-model="learned" rows="10" />
    <VBtn :disabled="isRequesting" @click="register">登録</VBtn>
    <VBtn @click="gotoCompletePage">終了</VBtn>
</template>

<script setup lang="ts">
import {ref} from '#imports'
import OpenAI from 'openai'
import { MessageType } from '~/types/Message'
const learned = ref('')
const isRequesting = ref(false)
const runtimeConfig = useRuntimeConfig()
const talkList = ref<any[]>([{ role: 'system', content: runtimeConfig.public.systemMessage }])

const MAX_REQUEST_COUNT = 3

const openai = new OpenAI({
    apiKey: runtimeConfig.public.apiKey,
    dangerouslyAllowBrowser: true
})

const register = async () => {
    isRequesting.value = true
    const completion = await openai.chat.completions.create({
        messages: [...talkList.value, { role: 'user', content: learned.value }],
        model: runtimeConfig.public.model,
    });
    talkList.value.push({ role: 'user', content: learned.value })
    talkList.value.push(completion.choices[0].message)
    learned.value = ''
    isRequesting.value = false
}

const messages = computed((): MessageType[] => {
    return talkList.value.filter((talk) => talk.role !== 'system').map((talk) => {
        return {
            text: talk.content,
            isMine: talk.role === 'user'
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