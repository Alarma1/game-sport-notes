<template>
    <div class="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div class="container mx-auto my-6">
            <div class="flex items-baseline">
                <div class="w-[16vw] h-8 flex bg-blue-500 text-white rounded shadow hover:bg-blue-600 mb-4">
                    <ButtonComp @btnClick="refreshNotes" btnTitle="Обновить заметки"/>
                </div>
                <div class="ml-4" v-if="loading">Загрузка...</div>
            </div>
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li class="bg-white rounded shadow" v-for="(item, index) in noteCartItem" :key="index">
                    <NoteCard :noteId="item._id" :name="item.author" :title="item.content" :date="item.dateAdded"
                              @emitAuthor="clickAuthor" @toggleFavorite="toggleFavoriteNote"
                              :isFavorite="isFavorite(item._id)"
                    />
                </li>
            </ul>
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Избранные заметки</h2>
                <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <li class="bg-white rounded shadow" v-for="(item, index) in favoriteNoteCartItem" :key="index">
                        <NoteCard :noteId="item._id" :name="item.author" :title="item.content" :date="item.dateAdded"
                                  @emitAuthor="clickAuthor" @toggleFavorite="toggleFavoriteNote" :isFavorite="true"
                        />
                    </li>
                </ul>
                <div class="w-[16vw] h-8 bg-red-500 text-white rounded shadow hover:bg-red-600 mt-4">
                    <ButtonComp @btnClick="deleteAllNotes" btnTitle="Удалить все избранные"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useCounterStore} from "../stores/counter";
    import {computed, onMounted} from 'vue';
    import NoteCard from '../components/NoteСard.vue';
    import ButtonComp from '../components/ButtonComp.vue';

    const state = useCounterStore();
    const loading = computed(() => state.loading);
    const noteCartItem = computed(() => state.noteData);
    const favoriteNoteCartItem = computed(() => state.favoriteNotes);
    const noteDataGet = () => {
        state.noteDataFetch();
    };
    onMounted(() => {
        noteDataGet();
        if (localStorage.favoriteNotesStorage !== undefined) {
            state.localStorageData(JSON.parse(localStorage.favoriteNotesStorage));
        }
    });
    const refreshNotes = () => {
        state.noteDataFetch();
    };
    const clickAuthor = (nameAuthor: string) => {
        state.noteDataFetch(nameAuthor);
    };
    const toggleFavoriteNote = (id: string) => {
        state.toggleFavoriteNoteActions(id);
        ChangeLocalStore();
    };
    const deleteAllNotes = () => {
        state.clearFavoriteNotes();
        ChangeLocalStore();
    };
    const ChangeLocalStore = () => {
        localStorage.favoriteNotesStorage = JSON.stringify(favoriteNoteCartItem.value);
    };
    const isFavorite = (id: string) => {
        return favoriteNoteCartItem.value.some(elem => elem._id === id);
    };
</script>
