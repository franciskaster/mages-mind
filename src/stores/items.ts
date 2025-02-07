import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
  const items = ref<Array<any>>([])
  const currentPage = ref([])

  function setItems(newItems: any) {
    items.value = newItems
  }

  function setCurrentPage(newItems: any) {
    currentPage.value = newItems
  }

  return { items, setItems, setCurrentPage }
})
