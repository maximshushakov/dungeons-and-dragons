var db;

class DB {
    static open() {
        var request = indexedDB.open('cards', 2);

        var promise = new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                db = event.target.result;
                resolve(event.target.result);
            }
            request.onerror = (event) => {
                reject(new Error(request.error));
            }
        });

        request.onupgradeneeded = (event) => { 
            db = event.target.result;
            var store = db.createObjectStore('cards', { autoIncrement : true });
            store.add({ word: '上', reading: 'うえ', meaning: 'above; up; over; top', example: '本は机の上です' });
            store.add({ word: '下', reading: 'した', meaning: 'below; down; under; bottom', example: '猫は机の下です' });
            store.add({ word: '前', reading: 'まえ', meaning: 'in front (of); before', example: 'あの人はあの家の前です。' });
            store.add({ word: '後ろ', reading: 'うしろ', meaning: 'back; behind', example: '私の家の後ろです。' });
        };

        return promise;
    }

    static get(store, key = null) {
        var transaction = db.transaction(['cards'], 'readwrite');
        var store = transaction.objectStore(store);
        var promise = new Promise(function(resolve, reject) {
            //transaction = (key) ? store.get(key) : store.getALL();
            transaction.objectStore('cards').getAll().onsuccess = (event) => resolve(event.target.result);
            //transaction.onerror = (event) => reject(new Error(transaction.error));
            db.close();
        });

        return promise;
    }
}

export default DB;