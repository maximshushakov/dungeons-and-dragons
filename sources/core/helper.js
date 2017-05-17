var url = (NODE_ENV == 'development') ? '/app/data/' : '/data/';

class Helper {
	static get(type) {
		return API.ajax({ url: url + type + '.json' });
	}

	static ajax({ url, params }) {
		var promise = new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
		
			xhr.setRequestHeader('x-apikey', '58d3ba9881f530cf439b3079');
			xhr.send();


			xhr.addEventListener('load', function() {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
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
