import { GalleryComponent } from "../../core/GalleryComponent";

export class Collection extends GalleryComponent {
   static className = 'collection'
   static id = 'collection'
   constructor($root) {
      super($root, {
         name: 'Collection',
         listeners: []
      })
   }
   toHTML() {
      return ``
   }

   onClick(event) {
      console.log(event.target)
   }
}