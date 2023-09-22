<template>
    <VTextarea :disabled="isRequesting" v-model="learned" rows="10" />
    <VBtn :disabled="isRequesting" @click="register">登録</VBtn>
    <VBtn @click="gotoCompletePage">終了</VBtn>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const learned = ref('')
const props = defineProps({
    isRequesting: Boolean,
})

const emits = defineEmits<{
    (e: 'register', text: string): void
    (e: 'gotoCompletePage'): void
}>()

const register = () => {
    emits('register', learned.value)
    learned.value = ''
}

const gotoCompletePage = () => {
    emits('gotoCompletePage')
}
</script>
