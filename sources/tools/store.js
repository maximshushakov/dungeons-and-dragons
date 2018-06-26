import { createStore } from 'redux';

export default function Store(actions = {}, reducers = {}, data = null) {
	const _actions = actions;
	const _reducers = reducers;
	const _subscribers = {};
	const _store = createStore((state, action) => {
		if (_reducers[action.type]) return _reducers[action.type](state);
		return state;
	}, data)

	return  {
	    get state() {
	    	return store.getState();
	    },

	    select() {

	    }

	    dispatch(type, data = {}) { 
	    	if (_actions[type]) {
	    		store.dispatch({ type, ...data });
	    	}
	    	else {
	    		console.warn(`Action ${type} does not exist`);
	    	}

	    	if (_subscribers[type]) {
	    		_subscribers[type].forEach(subscriber => {
	    			
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