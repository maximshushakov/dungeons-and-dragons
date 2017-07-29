class Helper {
	static get(type) {
		return Helper.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'GET',  key: '58d3ba9881f530cf439b3079' });
	}

	static post(type, data) {
		return Helper.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'POST',  key: '5948a6725f54052560916824', data });
	}

	static ajax({ type, url, key, data = null }) {
		var promise = new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(type, url);
		
			xhr.setRequestHeader("content-type", "application/json");
			xhr.setRequestHeader('x-apikey', key);
			data ? xhr.send(JSON.stringify(data)) : xhr.send();


			xhr.addEventListener('load', function() {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				}
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
					resolve({ success: true });
				}
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400) {
					resolve({ success: false, message: JSON.parse(xhr.response).message });
				}
				else {
					reject(new Error(`Helper.ajax returned: ${xhr.status}`));
				}
			})
		});

		return promise;	
	}

	static shuffle(array) {
		var i = 0,
			j = 0,
			temp = null;

		for (i = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1))
			temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		return array;
	}
}

export default Helper;
