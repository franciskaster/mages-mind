<template>
  <div id="sidebar" class="h-screen w-100 menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
    <div class="header">Mage's Mind</div>
    <ul @click="sidebarClicked">
      <li v-for="item in items" :data-id="item.id" :data-slug="item.slug" :key="item.id">
        <div>
          <a>{{ item.name }}</a>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6 edit">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </div>

      </li>


    </ul>
  </div>



  <dialog id="edit_page_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Editar página</h3>
      <div class="modal-content">
        <div class="label">
          <span class="label-text">Nome da página</span>
        </div>
        <input v-model="pageName" type="text" name="title" class="input input-bordered w-full max-w-xs" />
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click="savePage">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useIDB from '@/utils/useIDB.ts'
import { useRoute, useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const itemsStore = useItemsStore()
const router = useRouter()
const idbUtils = useIDB()
const items = ref<Array<any>>([])
const pageName = ref('')
let edit_page_modal: HTMLDialogElement
let currentPage: any

function editPage(event: Event) {
  const pages = itemsStore.items
  const target = event.target as HTMLElement
  const item = target.closest('li')
  if (!item) return
  const slug = item.dataset.slug as string
  currentPage = pages.find((page) => page.slug === slug)
  pageName.value = currentPage.name
  edit_page_modal.showModal()
}

async function savePage(event: Event) {
  if (!pageName.value) {
    event.preventDefault()
    return
  }
  await idbUtils.updatePageName(currentPage.id, pageName.value)
  items.value = await idbUtils.getPages()
}


function sidebarClicked(event: MouseEvent) {
  const target = event.target as HTMLElement
  const slug = target.closest('li')?.dataset.slug
  const item = itemsStore.items.find((item) => item.slug === slug)
  const edit = target.closest('.edit')

  if (!item) return
  if (edit) {
    editPage(event)
    return
  }
  if (slug) {

    router.push(`/${item.type}/${slug}`)
  }
}

onMounted(async () => {
  edit_page_modal = document.getElementById('edit_page_modal') as HTMLDialogElement
  items.value = await idbUtils.getPages()

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



ul li div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul li div a {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}

ul li div svg {

  visibility: hidden;
}

ul li div:hover svg {
  visibility: visible;
}

ul li div svg:hover {
  color: #FAFAFA;
}

.modal-content {
  padding-bottom: 0;
}

.modal-action {
  margin-top: 1rem;
}
</style>
