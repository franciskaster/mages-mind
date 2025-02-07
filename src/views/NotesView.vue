<template>
  <div class="inside-page ">
    <div class="header bg-base-200 "></div>
    <div class="body">
      <div class="actions">
        <h2>{{ pageObject?.name }}</h2>
        <div>
          <div class="tooltip tooltip-left" data-tip="Adicionar nova nota">
            <button @click="addNewNoteModal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div class="tooltip tooltip-left" data-tip="Remover todas as notas">
            <button @click="confirmDeleteAllSubItems">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="content-holder">
        <div class="content" @click="contentClicked">
          <div v-for="subitem in subitems" :key="subitem.id" :data-id="subitem.id" :data-slug="subitem.slug"
            class="note">
            <div class="actions">
              <svg class="remove-note size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="edit-note size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </div>
            <h3>{{ subitem.title }}</h3>
            <p class="content">{{ subitem.content }}</p>
            <div class="note__footer">
              <p>{{ subitem.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialog id="confirm_delete_all_subitems" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Remover todas as notas</h3>
      <div class="modal-content">
        <p>Tem certeza que deseja remover todas as notas?</p>
        <p>(essa ação é permanente)</p>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="deleteAllSubItems">Remover</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="add_new_card" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Adicionar nova nota</h3>
      <div class="modal-content">
        <div class="label">
          <span class="label-text">Título da nota</span>
        </div>
        <input type="text" name="title" class="input input-bordered w-full max-w-xs" />
        <div class="label">
          <span class="label-text">Tags</span>
        </div>
        <input type="text" name="tags" class="input input-bordered w-full max-w-xs" />
        <div class="label">
          <span class="label-text">Texto da nota</span>
        </div>
        <textarea rows="5" name="content" class="textarea textarea-bordered"></textarea>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="addNewNote">Adicionar</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useIDB from '@/utils/useIDB.ts'
import useUtils from '@/utils/useUtils'
import { useItemsStore } from '@/stores/items'

type Subitem = {
  id: number
  title: string
  slug: string
  content: string
  date: string
  tags: string[]
}

type Page = {
  id: number
  name: string
  slug: string
  subitems: Subitem[]
}

let add_new_card: HTMLDialogElement
let confirm_delete_all_subitems: HTMLDialogElement

const route = useRoute()
const itemsStore = useItemsStore()
const utils = useUtils()
const router = useRouter()
const idbUtils = useIDB()
const pageObject = ref<Page | null>(null)
const subitems = ref<Subitem[]>([])

function addNewNoteModal() {
  clearModal()
  add_new_card.showModal()
}

function clearModal() {
  const title = document.querySelector('input[name="title"]') as HTMLInputElement
  const tags = document.querySelector('input[name="tags"]') as HTMLInputElement
  const content = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
  title.value = ''
  tags.value = ''
  content.value = ''
}

function setModalContent(subitem: Subitem) {
  const title = document.querySelector('#add_new_card input[name="title"]') as HTMLInputElement
  const tags = document.querySelector('#add_new_card input[name="tags"]') as HTMLInputElement
  const content = document.querySelector('#add_new_card textarea[name="content"]') as HTMLTextAreaElement
  const button = document.querySelector('#add_new_card .modal-action button') as HTMLButtonElement
  const parent = button.closest('#add_new_card .modal-box') as HTMLDivElement
  button.textContent = 'Salvar'
  button.classList.add('edit')
  title.value = subitem.title
  tags.value = subitem.tags.join(',')
  parent.dataset.id = String(subitem.id)
  content.value = subitem.content
}

async function addNewNote(event: Event) {
  const target = event.target as HTMLElement
  const parent = target.closest('#add_new_card .modal-box') as HTMLDivElement
  if (!parent) return
  const title = parent.querySelector('#add_new_card input[name="title"]') as HTMLInputElement
  const tags = parent.querySelector('#add_new_card input[name="tags"]') as HTMLInputElement
  const content = parent.querySelector('#add_new_card textarea[name="content"]') as HTMLTextAreaElement
  const button = parent.querySelector('#add_new_card .modal-action button') as HTMLButtonElement
  if (!title.value) {
    event.preventDefault()
    return
  }
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = date.getDate()
  const year = date.getFullYear()
  const formattedDate = `${month}/${day}/${year}`
  const slug = utils.slugify(title.value)
  const tagsArray = tags.value.split(',')

  const newSubitem = {
    title: title.value,
    slug,
    content: content.value,
    date: formattedDate,
    tags: tagsArray,
    id: 0,
  } as Subitem

  if (button.classList.contains('edit')) {
    const id = Number(parent.dataset.id)
    newSubitem.id = id
    const updateSubItem = await idbUtils.updateSubItem(1, id, newSubitem)
    subitems.value = subitems.value.map((item) => {
      if (item.id === updateSubItem.id) {
        return updateSubItem
      }
      return item
    })
    button.classList.remove('edit')
    add_new_card.close()
    return
  }

  const addedSubItem = await idbUtils.addSubItem(1, newSubitem)
  subitems.value.push(addedSubItem)
}

function confirmDeleteAllSubItems() {
  confirm_delete_all_subitems.showModal()
}

async function deleteAllSubItems() {
  if (!pageObject.value) return
  await idbUtils.deleteAllSubItems(pageObject.value.id)
  subitems.value = []
}

async function contentClicked(event: MouseEvent) {
  const target = event.target as HTMLElement
  const note = target.closest('.note') as HTMLDivElement
  const removeNote = target.closest('.remove-note')
  const editNote = target.closest('.edit-note')
  if (!note) return
  const id = Number(note.dataset.id)
  if (removeNote) {
    const item = subitems.value.find((el) => el.id === id)
    if (!item) return
    if (!pageObject.value) return
    await idbUtils.deleteSubItem(pageObject.value.id, item.id)
    subitems.value = subitems.value.filter((sub) => sub.id !== id)
    return
  }
  if (editNote) {
    const item = subitems.value.find((el) => el.id === id)
    if (!item) return
    setModalContent(item)
    add_new_card.showModal()
  }
}


itemsStore.$onAction(({
  name,
  after,
}) => {
  if (name === 'setItems') {
    after(() => {
      const pageSlug = route.params.slug as string
      const pages = itemsStore.items
      const foundPage = pages.find((p: Page) => p.slug === pageSlug)
      if (!foundPage) return
      pageObject.value = foundPage

    })
  }
})

onMounted(async () => {
  add_new_card = document.getElementById('add_new_card') as HTMLDialogElement
  confirm_delete_all_subitems = document.getElementById('confirm_delete_all_subitems') as HTMLDialogElement
  const pageSlug = router.currentRoute.value.params.slug as string
  const pages = await idbUtils.getPages()
  const foundPage = pages.find((p: Page) => p.slug === pageSlug)
  if (!foundPage) return
  pageObject.value = foundPage
  subitems.value = await idbUtils.getSubItems(foundPage.id)
})
</script>

<style scoped>
.inside-page {
  width: 100%;
  height: 100%;
}

.header {
  height: 60px;
  width: 100%;
  font-size: 1.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #303030;
}

.body {
  height: calc(100% - 120px);
  padding: 0 1rem;
}

.body>.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #303030;
}

.body>.actions>div {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.body>.content-holder {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.body>.content-holder>.content {
  padding: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  overflow: hidden;
}

.note {
  height: 300px;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  overflow: auto;
  background-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-bg-opacity, 1)));
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.5px;
  word-spacing: 1px;
  text-align: left;
  text-transform: none;
  text-indent: 0px;
  display: grid;
  grid-template-rows: 30px calc(250px - 4rem) 20px;
  gap: 1rem;
  position: relative;
}

.note .actions {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: none;
  /* display: flex; */
}

.note:hover .actions {
  display: flex;
}

.note .actions svg {
  cursor: pointer;
  margin-right: 0.5rem;
}

.note .actions svg:last-child {
  margin-right: 0;
}

.note .actions svg:hover {
  color: #ff0000;
}

.note .actions svg.edit-note:hover {
  color: aqua;
}

.note .content {
  overflow-x: hidden;
  overflow-y: auto;
  white-space: break-spaces;
  scrollbar-width: thin;
}

.note h3 {
  height: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: 1px solid #303030;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note p {
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
}

.note .note__footer {
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  height: fit-content;
}
</style>
