//THIS IS WHERE SETTING OF ROUTING , STORE , RENDER TO APP
import React from "react";
import {render} from "react-dom";


//REDUX DEPENDENCY
import store  from './store.js';
import {Provider} from 'react-redux';

//CONTAINERS: APP
import App from './container/Appcontainer.js';
import DesignTemplate from './container/designTemplate.js';

import './style.css';

store.subscribe(() => {
    console.log(store.getState());
});

 render (
     <Provider store={store}>
         <App/> 
     </Provider>,
     window.document.getElementById('element') 
 );

// render (
//       <DesignTemplate/>,
//   window.document.getElementById('element') 
// );


/*
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (pos) => {
        console.log('lcoation: ',pos );
    } ) ;
      console.log('yes');
} 
    
var id, target, options;

function success(pos) {
  var crd = pos.coords;
  console.log('moving ',pos);

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('Congratulations, you reached the target');
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);
*/