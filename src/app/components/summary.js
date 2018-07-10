import React from "react";


export class Summary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            similiarStyle: {
                color: "black"
            }
        }
    }


    checkSimiliarity(attribute, productList, productSelected) {
        let cnt = 0;
        let isSame = true;

        for (cnt = 0; cnt < 2; cnt++) {
            console.log('--> ', productList[productSelected[cnt]][attribute])

            if (productList[productSelected[cnt]][attribute] !== productList[productSelected[cnt + 1]][attribute]) {
                isSame = false;
                break;
            }
        }

        return isSame;
    }

    attributeList(type, check) {
        return (
            (check) ? (
                <div style={this.state.similiarStyle}> {type} </div>
            ) : 
            (
                <div> {type} </div>
            )
        )
    }

    changeCheckbox() {
        console.log('on change');
        let cbox = document.getElementById('similiarCheck')

        if (cbox.checked) {
            this.setState({
                similiarStyle: {
                    color: "yellow"
                }
            })
        } else {
            this.setState({
                similiarStyle: {
                    color: "black"
                }
            })
        }
    }

    render() {
        const productList = this.props.product.productList.product;
        const productSelected = this.props.product.productSelected;
        const totalSelected = this.props.product.totalSelected;

        console.log(productList, productSelected, totalSelected)


        let isname = this.checkSimiliarity('name', productList, productSelected)
        let isprice = this.checkSimiliarity('price', productList, productSelected)
        let iscamera = this.checkSimiliarity('camera', productList, productSelected)
        let iscompany = this.checkSimiliarity('company', productList, productSelected)
        let isram = this.checkSimiliarity('ram', productList, productSelected)


        const list = productSelected.map((det, ind) => {
            console.log(det);
            let pdet = productList[det];
            return (
                <div className="row" key={ind}>
                    {/* <ul> */}
                    {this.attributeList(pdet.name, isname)}
                    {this.attributeList(pdet.price, isprice)}
                    {this.attributeList(pdet.camera, iscamera)}
                    {this.attributeList(pdet.company, iscompany)}
                    {this.attributeList(pdet.ram, isram)}
                    {/* </ul> */}
                </div>
            )
        })


        return (
            <div> Summary
               <div className="container">
                    {list}
                </div>

                <label>
                    <input type="checkbox" id="similiarCheck" value="Ignore similiar feature" onChange={() => {
                        this.changeCheckbox()
                    }} />
                    Ignore similiar feature
                </label>

            </div>
        )
    }
}