export default function Store(data, actions = {}) {
	const _state = data;
	const _actions = actions;
	const _subscribers = {};

	return  {
	    get state() {
	    	return Array.isArray(_state) ? _state.slice() : Object.assign({}, _state);
	    },

	    dispatch(type, data) { 
	    	var result = null;

	    	if (_actions[type]) {
	    		result = Promise.resolve(_actions[type](_state, data));
	    	}
	    	else {
	    		console.warn(`Action ${type} does not exist`);
	    	}

	    	if (_subscribers[type] && result) {
	    		_subscribers[type].forEach(subscriber => {
	    			result.then(subscriber.update).catch(error => console.error(error));
	    		});
	    	}
	    },

	    subscribe(type, callback){
	    	if (!_subscribers[type]) _subscribers[type] = [];
	    	_subscribers[type].push({ update: callback });
	    },

	    unsubscribe() {
	    	//_subscribers
	    }
	}
};