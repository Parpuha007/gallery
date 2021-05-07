import {Gallery} from './components/gallery/Gallery'
import { Collection } from './components/collection/Collection';
import { Upload } from './components/upload/Upload';
import './scss/index.scss'

const gallery = new Gallery('#app', {
   components: [Upload, Collection]
});

gallery.render();