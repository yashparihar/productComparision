import React from 'react';



//CONNECT REDUX WITH REACT APP WHICH DISPATCHING STATE AND ACTION TO PROPS
 import { connect } from 'react-redux';


//IMPORT ACTION
 import { 
          loadProduct,
          compareClick ,
          productSelect,
          productSwip
        } 
 from '../action/productAction';


//IMPORTING REACT ROUTER DEPENDENCY
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//All Components
import { Summary } from '../components/summary'
import { Product } from '../components/productApp/product';



class App extends React.Component {
    

    render() {
        return (
            <div>
             <Router>
              <div>
                    {/* // CHECK FOR AUTH THEN CHECK IF EXAM STILL PENDING FOR USER ELSE REDIRECT TO LOGIN OR SUMMARY PAGE */}
                    <Route exact path="/" 
                        render={() => (
                            <Product
                                product={this.props.product}
                                loadProduct= {this.props.loadProduct}
                                compareClick= {this.props.compareClick}
                            /> 
                    )} />

                    {/* // HERE CHECK FOR AUTH THEN CHECK IF GIVEN EXAM ELSE REDIRECT TO LOGIN OR PORTAL PAGE RESP  */}
                    <Route path="/summary" 
                        render={() => (
                            <Summary
                            product={this.props.product}
                            productSelect = {this.props.productSelect}
                            productSwip = {this.props.productSwip}
                            /> 
                    )} />

             </div>
            </Router>
          </div> 
        );
    }
}


//GETS STATES PASSED FROM PROVIDER
//STATE PASSED FROM REDUX AS WE WRAP THIS COMP AROUNF PROVIDER
const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

//THIS POPULATED IN THE COMPONENTS PROPS

//DISPATCH ACTION
const mapDispatchToProps = (dispatch) => {
    return {    
        loadProduct: () => {
            dispatch(loadProduct());
        },
        compareClick: (pid) => {
            dispatch(compareClick(pid));
        },
        productSelect: (pSelectedInd , pId) => {
            dispatch(productSelect(pSelectedInd , pId) )
        },
        productSwip: (idA , idB) => {
            dispatch( productSwip(idA , idB) );
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
//CONNECT BOTH PROPS AND DISPATCH ACTION