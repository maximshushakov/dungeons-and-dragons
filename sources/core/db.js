import api from "./api";

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
            db.createObjectStore('cards', { autoIncrement : true });
        };

        return promise;
    }

    static get() { //store, key = null) {
        var transaction = db.transaction(['cards'], 'readwrite');
        var store = transaction.objectStore('cards');
        var promise = new Promise(function(resolve, reject) {
            var request = store.getAll();
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }

    static add(data) { //store, key = null) {
        var transaction = db.transaction(['cards'], 'readwrite');
        var store = transaction.objectStore('cards');
        var promise = new Promise(function(resolve, reject) {
            data.forEach(card => store.add(card));
            transaction.onsuccess = (event) => resolve(event.target.result);
            transaction.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }
}

export default DB;