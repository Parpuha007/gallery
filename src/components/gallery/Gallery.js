import { $ } from "../../core/dom"

export class Gallery {
   constructor(selector, options) {
      this.$el = $(selector)
      this.components = options.components || []
   }

   getRoot() {
      const $root = $.create('div', 'gallery')

      this.components = this.components.map(Component => {
         const $el = $.create('div', Component.className, Component.id)
         const component = new Component($el)
      
         $el.html(component.toHTML())
         $root.append($el)
         return component  
      })
      return $root;
   }

   render() {
      this.$el.append(this.getRoot())

      this.components.forEach(component => component.init())
   }
}