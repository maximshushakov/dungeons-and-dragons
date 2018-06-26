import Helper from 'core/helper';

class RestDB {

	static get(type) { //?referencedby=true
		return Helper.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'GET',  key: '58d3ba9881f530cf439b3079' });
	}

	static post(type, data) {
		return Helper.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'POST',  key: '5948a6725f54052560916824', data });
	}
}

export default RestDB;
