//THIS IS WHERE SETTING OF ROUTING , STORE , RENDER TO APP
import React from "react";
import {render} from "react-dom";


//REDUX DEPENDENCY
import store  from './store.js';
import {Provider} from 'react-redux';

//CONTAINERS: APP
import App from './container/Appcontainer.js';




store.subscribe(() => {
    console.log(store.getState());
});

render (
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.getElementById('element') 
);