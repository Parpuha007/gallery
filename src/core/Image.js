export class GalleryImage {
   constructor(path) {
      this.path = path
   }

   addToGallery() {  
      const collectionList = document.getElementById('list')
      const listItem = document.createElement('li')
      listItem.className = 'collection__image'
      listItem.innerHTML = `<img src="${this.path}" loading="lazy" /><div class="collection__image-close"></div>`
      collectionList.append(listItem)
   }
   decision(response) {
      if (response.status === 200) {
         this.addToGallery()
      } else {
         alert(`Адрес ${this.path} битый`)
      }
   }
}