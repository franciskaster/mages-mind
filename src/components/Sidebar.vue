<template>
  <div id="sidebar" class="h-screen w-100 menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
    <div class="header">Mage's Mind</div>
    <ul @click="sidebarClicked">
      <li v-for="item in items" :data-id="item.id" :data-slug="item.slug" :key="item.id">
        <a>{{ item.name }}</a>
      </li>
    </ul>
  </div>
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
  const slug = target.closest('li')?.dataset.slug
  const item = itemsStore.items.find((item) => item.slug === slug)

  if (!item) return
  if (slug) {
    router.push(`/${item.type}/${slug}`)
  }
}

onMounted(async () => {
  items.value = await idbUtils.getPages()
  // let id = 1
  // const date = new Date();

  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const day = date.getDate();
  // const year = date.getFullYear();
  // const formattedDate = `${month}/${day}/${year}`;

  // const subitem = {
  //   name: 'Subitem 1 ',
  //   description: 'This is a subitem',
  //   date: formattedDate,
  //   tags: ['tag1', 'tag2'],
  //   id: id++,
  // }
  // idbUtils.addSubItem(1, subitem)
})
</script>

<style scoped>
#sidebar {
  width: 100%;
}

.header {
  /* background-color: red; */
  height: 60px;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  border-bottom: 1px solid #303030;
}

ul {
  width: 100%;
}
</style>
