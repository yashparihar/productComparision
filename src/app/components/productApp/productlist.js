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

        { console.log('in comp ', lComp.props.product);
          console.log(' prod:- ', prod );
           }
  
        return (
           
            <span>
                <img src={"app/images/"+prod.prodDetails.image} />
                {prod.prodDetails.name}
                {btn()}

            </span>
        )
    }

    render() {
        const products = this.props.productList;
        console.log('--all', this.props.product);


        let allProduct = products.map((det, ind) => {
            console.log('details : ', det);

            return (    
                <div className="col-sm m-3 p-4 bg-white shadow">

                    <this.productComponent key={ind} 
                        id={ind}
                        prodDetails={det}
                        name={det.name}
                    />  

                </div>
            )
        })

        return (
            <div>
                product lists..
                <div className="container">
                 <div className="row">
                     {allProduct}
                  </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            attribute - banner
                        </div> 
                        <div className="col">
                            dev 1
                        </div> 
                        <div className="col">
                            dev 2
                        </div> 
                        <div className="col">
                            dev 3
                        </div> 

                    </div>

                   


                    {/* <div className="row">
                        <div className="col-sm">
                            C
                        </div> 
                        <div className="col-sm">
                            D
                        </div> 
                    </div> */}
                </div>    

            </div>
        )
    }


}