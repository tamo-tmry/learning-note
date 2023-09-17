<template>
    <p>今日学んだことを書いてね</p>
    <VList>
        <VListItem v-for="(talk) in talks">{{ talk.content }}</VListItem>
    </VList>
    <VTextarea :disabled="isRequesting" v-model="learned" rows="10" />
    <VBtn :disabled="isRequesting" @click="register">登録</VBtn>
</template>

<script setup lang="ts">
import {ref} from '#imports'
import OpenAI from 'openai'
const learned = ref('')
const isRequesting = ref(false)
const runtimeConfig = useRuntimeConfig()
const talkList = ref<any[]>([{ role: 'system', content: runtimeConfig.public.systemMessage }])

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

const talks = computed(() => {
    return talkList.value.filter((talk) => talk.role !== 'system')
})

</script>