import React from "react";
// import {} from './../../images/ '

export class Productlist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boxStyle: {
                width: '20%',
                background: 'yellow',
                margin: '20px'
            }
        }
    }


    productComponent = (prod) => {
        const lComp = this;

        const btn = () => {
            console.log('tot s ', lComp.props.product.totalSelected)
            return (
                (lComp.props.product.totalSelected < 3 && !lComp.props.product.productSelected.includes(prod.id)) ?
                    (
                        <button className="badge badge-info"
                            onClick={() => lComp.props.compareClick(prod.id)}>
                            compare
                </button>
                    ) :
                    (<span> {/*nothing to show*/} </span>)
            )
        }

        {
            console.log('in comp ', lComp.props.product);
            console.log(' prod:- ', prod);
        }

        return (

            <div>
                <img className="p-3" src={"app/images/" + prod.prodDetails.Image} />
                {prod.prodDetails.Name}
                {btn()}

            </div>
        )
    }

    render() {
        const products = this.props.productList;
        console.log('--all', this.props.product);


        let allProduct = products.map((det, ind) => {
            console.log('details : ', det);

            return (
                <div className="col-sm m-2 p-2 bg-white shadow">

                    <this.productComponent key={ind}
                        id={ind}
                        prodDetails={det}
                        name={det.Name}
                    />
                </div>
            )
        })

        return (
                // <div className="container">
                    <div className="row">
                        {allProduct}
                    </div>
                // </div>
        )
    }


}