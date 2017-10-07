class Helper {
	static ajax({ type, url, key = null, data = null }) {
		var promise = new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(type, url);
		
			xhr.setRequestHeader("content-type", "application/json");
			if (key) xhr.setRequestHeader('x-apikey', key);
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
		let i = 0,
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

	static unique(array, key) {
		const map = {};
		return array.reduce((items, item) => {
			item = item[key];

			if (!map[item]) {
				map[item] = true;
				items.push(item);
			}
			return items;
		}, []);
	}
}

export default Helper;
