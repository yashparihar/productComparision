const productReducer = (state = {
    productList: null,

    productSelected: [false, false, false],
    totalSelected: 0,

}, action) => {
    switch (action.type) {
        case "LOAD_PRODUCT_FULFILLED":
            state = {
                ...state,
                productList: action.payload.productList,
            }
            break;
        case "COMPARE_CLICK_DONE":
            state = {
                ...state,
                totalSelected: state.totalSelected + 1,
                productSelected: action.payload.productSelected
            }
            break;
        case "PRODUCT_SELECT":
            let val = state.productSelected;
            val[action.payload.productSelectedInd] = action.payload.productId;

            state = {
                ...state,
                productSelected: val
            }
            break;
        case "PRODUCT_SWIP":
            let pSelected = state.productSelected; 

            let temp = pSelected[ action.payload.pA ];
            pSelected[ action.payload.pA ] = pSelected[ action.payload.pB ];
            pSelected[ action.payload.pB ] = temp;

            state = {
                ...state,
                productSelected: pSelected
            }
            break;
            

    }
    return state;

};

export default productReducer;
