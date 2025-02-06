<template>
  <ul
    id="sidebar"
    class="h-screen w-100 menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none"
    @click="sidebarClicked"
  >
    <li v-for="item in items" :data-id="item.id" :key="item.id">
      <a>{{ item.name }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useIDB from '@/utils/useIDB.ts'
import { useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const itemsStore = useItemsStore()
const router = useRouter()
const idbUtils = useIDB()
const items = ref<Array<any>>([])

function sidebarClicked(event: MouseEvent) {
  const target = event.target as HTMLElement
  const id = target.closest('li')?.dataset.id
  const item = itemsStore.items.find((item) => item.id === Number(id))
  if (!item) return
  if (id) {
    router.push(`/${id}/${item.type}`)
  }
}

onMounted(async () => {
  items.value = await idbUtils.getItems()

  // const subitem = {
  //   name: 'Subitem 1 ',
  //   description: 'This is a subitem',
  //   date: new Date().toISOString(),
  //   tags: ['tag1', 'tag2'],
  // }
  // idbUtils.addSubItem(1, subitem)
})
</script>

<style scoped>
ul {
  width: 100%;
}
</style>
