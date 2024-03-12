<template>
    <article class="p-4">
        <h2 class="text-gray-700 mb-4">{{ title }}</h2>
        <p class="text-sm text-gray-500">
            Автор: <span class="text-blue-500 cursor-pointer" @click="clickAuthor(name)">{{ name }}</span>
            • Дата: {{ date }}
        </p>
        <footer class="flex justify-end text-gray-500">
            <div class="hover:text-blue-500">
                <ButtonComp :id="noteId" @btnClick="toggleFavorite">
                    <svg xmlns="http://www.w3.org/2000/svg" :fill="isFavorite ? 'currentColor' : 'none'"
                         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                    </svg>
                </ButtonComp>
            </div>
        </footer>
    </article>
</template>

<script setup lang="ts">
    import ButtonComp from '../components/ButtonComp.vue'

    const props = defineProps({
        noteId: String,
        name: String,
        title: String,
        date: String,
        isFavorite: Boolean
    })
    const emit = defineEmits(['emitAuthor'])
    const clickAuthor = (nameAuthor: string) => {
        emit('emitAuthor', nameAuthor)
    }
    const toggleFavorite = (id: string) => {
        emit('toggleFavorite', id)
    }
</script>

<style scoped>

</style>
