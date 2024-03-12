import {defineStore} from 'pinia';
import {Note} from '../components/interface/index'

export const useCounterStore = defineStore('counter', {
        state: () => ({
            noteData: [] as Note[],
            favoriteNotes: [] as Note[],
            loading: null as boolean | null
        }),
        actions: {
            noteDataFetch(name: string = '') {
                this.loading = true;
                return fetch(`https://api.quotable.io/quotes?limit=10&author=${name}`, {
                    method: "GET"
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка при получении данных');
                        }
                        return response.json();
                    })
                    .then(responseJson => {
                        this.noteData = responseJson.results;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.error('Произошла ошибка:', error);
                        this.loading = false;
                    });
            },
            localStorageData(localData: Note[]) {
                if (localData) {
                    this.favoriteNotes = localData;
                }
            },
            toggleFavoriteNoteActions(id: string) {
                const existingIndex = this.favoriteNotes.findIndex(elem => id === elem._id);
                if (existingIndex !== -1) {
                    this.favoriteNotes.splice(existingIndex, 1);
                } else {
                    this.favoriteNotes.push(this.noteData.find(elem => id === elem._id))
                }
            },
            clearFavoriteNotes() {
                this.favoriteNotes = [];
            }
        },

    })
;
