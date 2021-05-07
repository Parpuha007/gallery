// Pure functions
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

export async function getUrlsFromJSON(url) {
   const response = await fetch(url);
   
   if (response.ok) {
      const json = await response.json()
      const arr = json.galleryImages.map(el => {
         checkURI(el.url)
         .then(status => {
            addImage(status, el.url)
         })
      })  
   }
}

export async function checkURI(path) {
   const response = await fetch(path);
   return response.status === 200;
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