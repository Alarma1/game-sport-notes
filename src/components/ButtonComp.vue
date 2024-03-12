<template>
    <button class="w-full h-full text-base" @click="buttonClick(id)">{{ btnTitle }}
        <slot class="flex"></slot>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        btnTitle: String,
        id: String,
    })
    const emit = defineEmits(['btnClick'])
    const buttonClick = (id: string) => {
        emit('btnClick', id)
    }
</script>

<style scoped>

</style>
