<template>
    <p>{{ label }}</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    label: String
})
</script>