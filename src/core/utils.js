// Pure functions

import { GalleryImage } from "./Image";

// input => Input
export function capitalize(string) {
   if (typeof string !== 'string') {
      return ''
   }
   return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isJSON(url) {
   return url.slice(url.length - 5) === '.json'
}

export function isImage(url) {
   return url.slice(url.length - 4) === '.png' || '.jpg'
}
// export async function getUrlsFromJSON(url) {
//    const response = await fetch(url);
   
//    if (response.ok) {
//       const json = await response.json()
//       const arr = json.galleryImages.map(el => {
//          checkURI(el.url)
//          .then(status => {
//             addImage(status, el.url)
//          })
//       })  
//    }
// }
export async function getUrlsFromJSON(url) {
   const response = await fetch(url);
   
   if (response.ok) {
      const json = await response.json()
      const arr = json.galleryImages.map(el => {
         return el.url
      })
      return arr
   }
}

// export async function checkURI(path) {
//    const response = await fetch(path)
//    return response
// }
export function checkURI(path) {
   return new Promise((resolve, reject) => {
   const response = fetch(path)
   resolve(response)
   })
}

export function addImage(status, path) {
   if (status) {
      const img = document.createElement('img')
      img.src = path
      img.classList.add('collection__image')
      collection.append(img)
   } else {
      console.log('картинка не добавилась')
   }
}

export function hasHttps(path) {
   path = path.includes('https://') || path.includes('http://') ? path : 'https://' + path
   return path
}

export function readFile(files) {
   for (let i = 0; i < files.length; i++) {
      const reader = new FileReader(files[i])
      reader.readAsDataURL(files[i])
      reader.onload = () => {
         const image = new GalleryImage(reader.result)
         image.addToGallery()
      }
   }
}
export function fadeOut(selector) {
   const fadeTarget = selector
   var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
         fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
         fadeTarget.style.opacity -= 0.2;
      } else {
         selector.style.display = 'none'
         clearInterval(fadeEffect);
      }
   }, 50); 
}