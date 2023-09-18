<template>
    <div :class="className">
        <p class="message">{{ message.text }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { MessageType } from '~/types/Message';

const props: Props = defineProps({
    message: Object as () => MessageType
})

const className = computed(() => {
    return props.message.isMine ? 'mine' : 'sender';
})
</script>

<style lang="scss" scoped>
.sender, .mine {
    position: relative;
    max-width: 75%;
}

.sender {
    margin: 0 auto 0 15px;
}

.mine {
    margin: 0 15px 0 auto;
}

.sender .message,
.mine .message {
    position: relative;
    margin: 0;
    padding: 10px 20px;
    border-radius: 20px;

    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        top: 10px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
    }
}

.sender .message {
    background-color: #fff;

    &::before {
        left: -10px;
        border-right: 20px solid #fff;
    }
}

.mine .message {
    background-color: #8de055;

    &::before {
        right: -10px;
        border-left: 20px solid #8de055;
    }
}
</style>