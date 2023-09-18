<template>
    <div class="message-container">
        <div v-for="message in messages" class="message">
            <Message :message="message" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Message from './Message.vue'; // コレないとダメ、なあぜなあぜ？
import { MessageType } from '~/types/Message';
import { defineProps } from 'vue';

const props = defineProps({
    messages: Array as () => MessageType[]
})
</script>

<style lang="scss" scoped>
.message-container {
    padding: 20px;
    background-color: #7494c0;
}

.message {
    margin-bottom: 20px;
}
</style>