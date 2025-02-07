export default function useUtils() {
  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  function clearAllModals() {
    document.querySelectorAll('input').forEach((input) => {
      input.value = ''
    })
    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.value = ''
    })
    document.querySelectorAll('select').forEach((select) => {
      select.value = ''
    })
  }

  return { slugify, clearAllModals }
}
