import React from "react";
import {NavLink} from 'react-router-dom' ;

import { Productlist } from './productlist';
import { Productsearch } from './productsearch';


export class Product extends React.Component {

    constructor(props){
        super(props);

        props.loadProduct();
    }

    render() {
        const products = this.props.product;
        let plist = null;
        console.log('p-> ',products);

        if (products && products!=null){
            plist = products.productList;
            console.log('pl -> ',plist);
        }

        return (
            (plist === null) ? 
            (
                <div> Loading products
                </div>    
            ) :
            (
                <div className="container">
                    {/* product
                    <Productsearch/> */}

                    <Productlist
                        product={products}
                        productList={plist.product}
                        totalProduct={plist.totalProduct}
                        compareClick={this.props.compareClick}
                    />

                    <NavLink  to="/summary" activeStyle={{color: 'green'}}> Summary  </NavLink>

                </div>
            )
        )
    }
}