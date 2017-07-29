class DB {
    static open() {
        const request = indexedDB.open('cards', 1);

        const promise = new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                this._db = event.target.result;
                resolve(event.target.result);
            }
            request.onerror = (event) => {
                reject(new Error(request.error));
            }
        });

        request.onupgradeneeded = (event) => { 
            // words: { _id, word, meaning, reading, hint }
            // examples: { _id, example, word }

            this._db = event.target.result;
            const words = this._db.createObjectStore('words', { keyPath: 'word' }); 
            const examples = this._db.createObjectStore('examples', { autoIncrement : true });
            examples.createIndex("word", "word", { unique: false });
            examples.createIndex("example", "example", { unique: true });
        };

        return promise;
    }

    static get(storeName) {
        const transaction = this._db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const promise = new Promise(function(resolve, reject) {
            const request = store.getAll();
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }

    static add(storeName, data) {
        const transaction = this._db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const promise = new Promise(function(resolve, reject) {
            data.forEach(item => store.add(item));
            transaction.onsuccess = (event) => resolve(event.target.result);
            transaction.onerror = (event) => reject(new Error(transaction.error));
        });

        return promise;
    }

    static update(storeName, data, _id) {

    }

    /*static join(...stores, key) {
        const transaction = db.transaction(...stores);

        const promise = new Promise(function(resolve, reject) {
            transaction.objectStore("words").openCursor().onsuccess = function(event) {
                wordsCursor = event.target.result;
                examples = [];
                attemptWalk();
            }

            transaction.oncomplete = () => resolve(data);
        });

        return promise;

  var cards = [];
  
 
  var wordsCursor;
  var examplesIndex;
  var examplesCursor;
  var examplesLoaded = false;
  var examples;
 
  transaction.objectStore("words").openCursor().onsuccess = function(event) {
    wordsCursor = event.target.result;
    examples = [];
    attemptWalk();
  }
  examplesIndex = transaction.objectStore("examples").index("word");
  examplesIndex.openCursor().onsuccess = function(event) {
    examplesCursor = event.target.result;
    examplesLoaded = true;
    attemptWalk();
  }
  function attemptWalk() {
    if (!wordsCursor || !examplesLoaded)
      return;
 
    if (examplesCursor && wordsCursor.value.word == examplesCursor.value.word) {
      examples.push(examplesCursor.value.example);
      examplesCursor.continue();
    }
    else {
      wordsCursor.value.examples = examples
      cards.push(wordsCursor.value);
      wordsCursor.continue();
    }
  }
    }*/
}

export default DB;