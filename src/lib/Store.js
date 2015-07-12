import { EventEmitter } from 'events';
import Dispatcher from 'Dispatcher';

class Store extends EventEmitter {
   constructor() {
     super();
     Dispatcher.register(this.update.bind(this));
   }

   update(payload) {
   }

   emitChange() {
     this.emit('change');
   }

   subscribe(callback) {
     this.on('change', callback);
   }

   unsubscribe(callback) {
     this.removeListener('change', callback);
   }
}

export default Store;
