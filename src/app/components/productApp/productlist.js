import React from "react";


export class Productlist extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            boxStyle: {
                width: '20%',
                background: 'yellow',
                margin: '20px'
            }
        }
    }


    productComponent = (prod) =>{
        const lComp = this;
   
        const btn = () => {
            console.log('tot s ', lComp.props.product.totalSelected)
            return (
                ( lComp.props.product.totalSelected < 3 && !lComp.props.product.productSelected.includes(prod.id) ) ? 
                (
                    <button 
                    onClick={() => lComp.props.compareClick(prod.id)}>
                    compare
                </button>     
                ) : 
                ( <span> doneComparing </span> )
            )
        }

        {console.log('in comp ', lComp.props.product) }
        return (
            <div style={this.state.boxStyle}>
                 {prod.name} 
                {btn()}
   
             </div>   
        )
    }

    render() {
        const products = this.props.productList;
        console.log('--all', this.props.product);

        
        let allProduct = products.map( (det, ind) => {
                return (
                    <this.productComponent key={ind} 
                        id={ind}
                        name={det.name}
                         />
                )
        }) 
        
        return (
            <div>
                product lists..

                {allProduct}
            </div>
        )
    }


}