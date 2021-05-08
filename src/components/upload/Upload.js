import { GalleryComponent } from "../../core/GalleryComponent";
import { GalleryImage } from "../../core/Image";
import { checkURI, getUrlsFromJSON, isJSON, isImage, hasHttps, readFile } from "../../core/utils";

export class Upload extends GalleryComponent {
   static className = 'upload'
   static id = 'upload'
   constructor($root) {
      super($root, {
         name: 'Upload',
         listeners: ['click', 'change']
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
         <input type="file" id="input-file" class="upload__local-input" multiple>
      </div>`
   }

   onClick(event) {
      if (event.target.id === 'btn') {
         let path = document.getElementById('input').value
         if (path) {
            path = hasHttps(path)
            // debugger            
            checkURI(path).then(response => {
               if (response.status === 200) {
                  if(isJSON(path)) {
                     getUrlsFromJSON(path).then((array) => {
                        array.map(el => {
                           const image = new GalleryImage(el)
                           checkURI(image.path).then(response => {
                              image.decision(response)
                           })
                        })
                     })
                  } else if (isImage(path)) {
                     const image = new GalleryImage(path)
                     checkURI(image.path).then(status => {
                        image.decision(status)
                     })
                  }
               }
            }).catch(er => {
               console.error(er)
            })
         } else alert('Введите адрес в строку!')
      }
   }
   onChange(event) {
      if (event.target.id === 'input-file') {
         readFile(event.target.files)
      }
   }
}