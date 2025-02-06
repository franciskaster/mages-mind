import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
  const items = ref<Array<any>>([])

  function setItems(newItems: any) {
    items.value = newItems
  }

  return { items, setItems }
})
