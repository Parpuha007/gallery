import { GalleryComponent } from "../../core/GalleryComponent";
import { addImage, checkURI, getUrlsFromJSON, isJSON } from "../../core/utils";

export class Upload extends GalleryComponent {
   static className = 'upload'
   static id = 'upload'
   constructor($root) {
      super($root, {
         name: 'Upload',
         listeners: ['click']
      })
   }
   toHTML() {
      return `<div class="upload__row">
         <input placeholder="Введите URL картинки" class="upload__url-input" type="text" id="input">
         <button class="upload__url-btn" id="btn">Загрузить</button>
      </div>
      <div class="upload__row">
         <span>или</span>
         <label class="upload__local-label" for="input-file">Выберите файл</label>
         <input type="file" id="input-file" class="upload__local-input">
      </div>`
   }

   onClick(event) {
      if (event.target.id === 'btn') {
         const collection = document.getElementById('collection')
         const input = document.getElementById('input')
         if (input.value) {
            if (isJSON(input.value)) {
               getUrlsFromJSON(input.value)
            } else {
               checkURI(input.value)
                  .then(status => {
                     addImage(status, input.value)
                  })
            }
         }
      }
   }
}