import { GalleryComponent } from "../../core/GalleryComponent";
import { fadeOut } from "../../core/utils";

export class Collection extends GalleryComponent {
   static className = 'collection'
   static id = 'collection'
   constructor($root) {
      super($root, {
         name: 'Collection',
         listeners: ['click']
      })
   }
   toHTML() {
      return `<ul class="collection__list" id="list"></ul>`
   }
   onClick(event) {
      if (event.target.className === 'collection__image-close') {
         const li = event.target.closest('.collection__image')
         fadeOut(li)
      }
   }
}