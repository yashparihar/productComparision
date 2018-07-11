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


    attributeList(attribute, isSame) {
        return (
            (isSame) ? (
                <div style={this.state.similiarStyle}> {attribute} </div>
                // <div className="text-muted"> {attribute} </div>
            ) :
                (
                    <div> {attribute} </div>
                )
        )
    }


    changeCheckbox() {
        console.log('on change');
        let cbox = document.getElementById('similiarCheck')

        if (cbox.checked) {
            this.setState({
                similiarStyle: {
                    color: "gray"
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

    searchChar(event, list, productSelected) {
        console.log('something was changes to ', event.target.id, list);
        let searchVal = event.target.value;
        let searchId = event.target.id;



        searchId = searchId[searchId.length - 1]

        let searchResId = "searchRes" + searchId;
        console.log('sid ', searchId, searchResId);

        let ele = document.getElementById(searchResId);


        if (searchVal === "") {
            ele.classList.add('d-none');
            return;
        }



        console.log('class: ', ele.classList);

        let selectedInd = [];
        let found = list.filter((obj, ind) => {

            let keywords = obj.Name.split(' ');
            let cnt = 0;
            for (cnt = 0; cnt < keywords.length; cnt++) {
                let regEx = new RegExp('^' + searchVal);
                let matched = keywords[cnt].match(regEx);

                if (matched) {
                    if (!productSelected.includes(ind)) {
                        selectedInd.push(ind);
                        return obj;
                    }
                    break;
                }
            }

            if (selectedInd.length > 0){
                ele.classList.remove('d-none');
            } else {
                ele.classList.add('d-none');
            }
        })


        console.log('found list : ', found, selectedInd);
    }

    render() {
        const productList = this.props.product.productList.product;
        const productSelected = this.props.product.productSelected;
        const totalSelected = this.props.product.totalSelected;
        const features = this.props.product.productList.productFeature;

        // 1. FEATURE LIST..
        const featureList = features.map((attribute, ind) => {

            let headPart = null;
            let detailPart = null;
            let isSame = this.checkSimiliarity(attribute, productList, productSelected);


            // 1.1 HEAD PART..
            if (attribute == "Image") {
                headPart = (

                    <div className="col border-right">
                        <label>
                            <input type="checkbox" id="similiarCheck" value="Ignore similiar feature" onChange={() => {
                                this.changeCheckbox()
                            }} />
                            Similiar
                  </label>
                    </div>
                )
            } else {
                headPart = (

                    <div className="col border-right">
                        {attribute}
                    </div>
                )
            }


            // 1.2 DETAIL PART........
            detailPart = productSelected.map((pid, ind) => {

                let searchTxtId = "search" + ind;
                let searchResId = "searchRes" + ind;

                
                return (

                    (attribute == "Image") ?
                        (
                            <div className="col border-right" key={ind} >

                                <input id={searchTxtId} type="text" className="form-control sm"
                                    onChange={(event) => { this.searchChar(event, productList, productSelected) }} />


                                <ul id={searchResId} className="list-group position-fixed d-none" >

                                    <li className="list-group-item" >Morbi leo risus</li>
                                    <li className="list-group-item">Porta ac consectetur ac</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <img src={"app/images/" + productList[pid][attribute]} />
                            </div >

                        )
                        : (

                            <div className="col border-right" key={ind}>
                                {this.attributeList(
                                    productList[pid][attribute],
                                    isSame)}
                            </div>
                        )
                )
            })



            return (

                <div className="row border m-2 p-2 bg-white shadow" key={ind} >

                    {headPart}
                    {detailPart}
                </div>

            )
        })



        return (
            <div >
                {featureList}
            </div>
        )
    }
}