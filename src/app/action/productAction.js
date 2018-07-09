
import { databaseGetAll , shuffle } from '../utility/helper'


function loadProduct() {
    return dispatch => {

            databaseGetAll()
            .then((res)=>{
                    res.product = shuffle(res.product);

                    dispatch(loadProductDone(res));
            });
    
    }
}

function loadProductDone(data) {

    console.log('in action ', data);
    return {
        type: "LOAD_PRODUCT_FULFILLED",
        payload: {
            productList : data
        }
    }
}


function compareClick(pid){
    return (dispatch, getState) => {
        let product = getState().product;
        let productSelectedArray = product.productSelected;
        let totalSelected = product.totalSelected;

        productSelectedArray[totalSelected] = pid

        dispatch(compareClickDone(productSelectedArray));
    }
}

function compareClickDone(productSelectedArray){
    return {
        type:"COMPARE_CLICK_DONE",
        payload:{
            productSelected:productSelectedArray
        }
    }
}


export {
    loadProduct,
    compareClick
}

