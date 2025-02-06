import { openDB } from 'idb'
import { useItemsStore } from '@/stores/items'
type AllowedTypeStrings = 'notes' | 'todo'
type SubItem = {
  name: string
  date: string
  description: string
  tags: string[]
}

declare global {
  interface Window {
    idb: any
  }
}

export default function useIDB() {
  async function ODB(dbName: string, storeName: string, version: number, index: string) {
    return openDB(dbName, version, {
      upgrade(db) {
        const store = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        })

        store.createIndex('name', index)
        store.add({ name: 'Notas', slug: 'notes', type: 'notes', subitems: [] })
        // store.add({ name: 'To do', slug: 'to-do', type: 'todo', subitems: [] })
      },
    })
  }

  async function addItem(item: { name: string; type: AllowedTypeStrings }, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    await db.add(storeName, item)
  }

  async function addSubItem(itemId: number, subItem: SubItem, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    let item = await db.get(storeName, itemId)
    const id = item.subitems.length ? item.subitems[item.subitems.length - 1].id + 1 : 1
    const newItem = { ...subItem, id }
    item.subitems.push(newItem)
    await db.put(storeName, item)
    return newItem
  }

  async function getSubItems(itemId: number, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    let item = await db.get(storeName, itemId)
    return item.subitems
  }

  async function getPages(storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    const res = await db.getAll(storeName)
    useItemsStore().setItems(res)
    return res
  }

  async function deleteItem(id: number, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    await db.delete(storeName, id)
  }

  async function deleteSubItem(itemId: number, subItemId: number, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    let item = await db.get(storeName, itemId)
    item.subitems = item.subitems.filter((subitem: { id: number }) => subitem.id !== subItemId)
    await db.put(storeName, item)
  }

  async function deleteAllSubItems(itemId: number, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    let item = await db.get(storeName, itemId)
    item.subitems = []
    await db.put(storeName, item)
  }

  async function updateItem(
    id: number,
    item: { name: string; type: AllowedTypeStrings },
    storeName = 'pages',
  ) {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    await db.put(storeName, item, id)
  }

  async function updateSubItem(
    itemId: number,
    subItemId: number,
    subItem: SubItem,
    storeName = 'pages',
  ) {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    let item = await db.get(storeName, itemId)
    item.subitems = item.subitems.map((subitem: { id: number }) =>
      subitem.id === subItemId ? subItem : subitem,
    )
    await db.put(storeName, item)
    return subItem
  }

  async function getItemById(id: number, storeName = 'pages') {
    let db = window.idb
    if (!db) db = await ODB('mages-db', storeName, 1, 'name')
    return await db.get(storeName, id)
  }

  return {
    ODB,
    addItem,
    addSubItem,
    getPages,
    getSubItems,
    getItemById,
    deleteItem,
    deleteAllSubItems,
    deleteSubItem,
    updateItem,
    updateSubItem,
  }
}
