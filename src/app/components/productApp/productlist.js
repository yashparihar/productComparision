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
                <img className="img-fluid img-thumbnail p-2" src={"app/images/" + prod.prodDetails.Image} height="20%" />
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
                <div key={ind} className="col-sm-auto col-md-4 col-lg-3 col-xl-5 col-xs-2 offset-md-2 offset-lg-4
                        m-1 bg-white shadow">

                    <this.productComponent 
                        id={ind}
                        prodDetails={det}   
                        name={det.Name}
                    />
                </div>
            )
        })

        return (
                // <div className="container">
                //  justify-content-md-center
                    <div className="row align-items-start">
                        {allProduct}
                    </div>
                // </div>
        )
    }


}