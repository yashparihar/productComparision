const productReducer = (state = {
    productList: null,

    productSelected:[false,false,false] ,
    totalSelected:0,

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
  

    }
    return state;
    
};

export default productReducer;
