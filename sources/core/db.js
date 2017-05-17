var db;

class DB {
    static open() {
        var request = indexedDB.open('cards', 1);

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
            /*** 
                Structure:
                words -> { word, reading, meaning }
            */
            var store = db.createObjectStore('words', { autoIncrement : true });
            store.createIndex('word', 'word', { autoIncrement : true });
        };

        return promise;
    }

    static get(storeName) { //store, key = null) {
        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var promise = new Promise(function(resolve, reject) {
            var request = store.getAll();
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }

    static add(storeName, data) { //store, key = null) {
        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var promise = new Promise(function(resolve, reject) {
            data.forEach(item => {
                var request = store.add(item);
            });
            transaction.onsuccess = (event) => resolve(event.target.result);
            transaction.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }
}

export default DB;