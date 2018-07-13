import React from "react";

import { arrayToCsvConverter } from './../utility/helper.js'


export class Summary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            similiarStyle: {
                color: "black"
            },
            searchRes: null
        }
    }

    // CHECKING SIMILIARITY BTW PRODUCT AS PER ATTRIBUTES
    checkSimiliarity(attribute, productList, productSelected) {
        let cnt = 0;
        let isSame = true;

        for (cnt = 0; cnt < 2; cnt++) {
            //console.log('--> ', productList[productSelected[cnt]][attribute])
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

    dragStart(ev, ind) {
        ev.persist();
        // console.log('dragging ', ev.target);
        ev.dataTransfer.setData("draggedProductInd", ind);
        ev.dropEffect = "move";
    }


    draggingOver(ev) {
        // ev.target.style.backgroundColor = 'green';
        ev.target.style.border = "1px solid grey"

        let t = ev.target.parentNode;
        console.log(ev.target, ' == ', t);

        ev.preventDefault();
        // // Set the dropEffect to move
        // ev.dataTransfer.dropEffect = "move";
    }

    onDropping(ev, ind) {
        ev.preventDefault();
        // event.stopPropagation()

        ev.target.style.removeProperty('border');

        let draggedProductInd = ev.dataTransfer.getData('draggedProductInd');
        //.. FIRE ACTION WHICH INTERCHANGE SERIAL ID IN SELECTED PRODUCT
        console.log(typeof(draggedProductInd) + ' and ' + typeof(ind)) ;

        if (draggedProductInd === ind.toString()) {
            console.log('dropping on same location');
        } else {
            this.props.productSwip(draggedProductInd, ind)
        }
    }


    dragEnd(ev){
        ev.preventDefault();
        ev.target.style.removeProperty('border');
        console.log('drag end -> ', ev.target );
    }


    getSerialNo(searchId) {
        return searchId[searchId.length - 1]
    }


    searchChar(event, list, productSelected) {
        let searchVal = event.target.value;

        let searchId = this.getSerialNo(event.target.id); //searchId[searchId.length - 1]

        let searchResId = "searchRes" + searchId;
        // console.log('sid ', searchId, searchResId);

        let ele = document.getElementById(searchResId);


        if (searchVal === "") {
            ele.classList.add('d-none');
            return;
        }


        let selectedInd = [];
        let found = list.filter((obj, ind) => {

            let keywords = obj.Name.split(' ');
            let cnt = 0;
            for (cnt = 0; cnt < keywords.length; cnt++) {
                let regEx = new RegExp('^' + searchVal, 'i');
                let matched = keywords[cnt].match(regEx);

                if (matched) {
                    if (!productSelected.includes(ind)) {
                        selectedInd.push(ind);
                        return obj;
                    }
                    break;
                }
            }

            if (selectedInd.length > 0) {
                ele.classList.remove('d-none');
            } else {
                ele.classList.add('d-none');
            }
        })

        //console.log('found list : ', found, selectedInd, this.state.searchRes);

        this.setState({
            searchRes: selectedInd
        })

    }


    // ....... RENDER ...........
    render() {
        const productList = this.props.product.productList.product;
        const productSelected = this.props.product.productSelected;
        const totalSelected = this.props.product.totalSelected;
        const features = this.props.product.productList.productFeature;

        let productCsvData = new Array(4);
        productCsvData[0] = new Array(features.length);
        productCsvData[1] = new Array(features.length);
        productCsvData[2] = new Array(features.length);
        productCsvData[3] = new Array(features.length);


        productCsvData[0] = [...features];


        // 1. FEATURE LIST..
        const featureList = features.map((attribute, ind) => {

            let headPart = null;
            let detailPart = null;
            let isSame = this.checkSimiliarity(attribute, productList, productSelected);


            headPart = (
                (attribute == "Image") ? (
                    <div className="col border-right">
                        <label>
                            <input type="checkbox" id="similiarCheck" value="Ignore similiar feature" onChange={() => {
                                this.changeCheckbox()
                            }} />
                            Similiar
                  </label>
                    </div>
                ) :
                    (
                        <div className="col border-right">
                            {attribute}
                        </div>
                    )
            )


            // 1.2 DETAIL PART........
            detailPart = (rowno) => {
                console.log('rn: ', rowno);

                return productSelected.map((pid, selectPInd) => {


                    let searchTxtId = "search" + selectPInd;
                    let searchResId = "searchRes" + selectPInd;
                    // let imageId = "pImg" + selectPInd

                    let result = null;
                    let currentComp = this;

                    // CSV DATA D-2............
                    productCsvData[selectPInd + 1][rowno] = productList[pid][attribute];

                    // productCsvData[selectPInd+1][ attribute ] = productList[pid][attribute] ; 

                    // console.log('psd --> ', productCsvData[selectPInd]);

                    if (this.state.searchRes !== null) {

                        result = this.state.searchRes.map((resid, resind) => {
                            console.log('res ', productList[resid]);
                            let resClass = 'res';// + resind;

                            // TO SHOW PRODUCT NAME, IMAGE AND HOVER EFFECT
                            return (
                                <li className="list-group-item " >

                                    <a className={resClass + ' row'}
                                        title="click to view" data-toggle="popover" data-trigger="hover" data-content="Some content"
                                        onClick={() => {
                                            console.log('clicked ');
                                            currentComp.props.productSelect(selectPInd, resid);
                                        }}>

                                        <span className='col-'>
                                            <img className='w-25' src={"app/images/" + productList[pid][attribute]}

                                            />
                                        </span>

                                        <span className='col-'>
                                            {productList[resid].Name}
                                        </span>

                                    </a>
                                </li>
                            )


                        })
                    }




                    return (

                        (attribute == "Image") ?
                            (
                                <div className="col border-right" key={selectPInd}>

                                    {/* SEARCH BOX */}
                                    <input id={searchTxtId} type="text" className="form-control sm"
                                        onChange={(event) => { this.searchChar(event, productList, productSelected) }} />


                                    {/* SEARCH RESULT */}
                                    <ul id={searchResId} className="list-group position-fixed d-none" >
                                        {result}
                                        {/* <li className="list-group-item" >Morbi leo risus</li> */}
                                    </ul>


                                    {/* PRODUCT IMAGE - DRAGGABLE */}
                                    <img
                                        draggable="true"

                                        onDragStart={(ev) => this.dragStart(ev, selectPInd)}
                                        onDragOver={(ev) => this.draggingOver(ev)}
                                        onDrop={(ev) => this.onDropping(ev, selectPInd)}
                                        onDragEnd={(ev) => this.dragEnd(ev)}

                                        src={"app/images/" + productList[pid][attribute]} />

                                </div >

                            )
                            : (
                                <div className="col border-right" key={selectPInd}>
                                    {/* { productCsvData[selectPInd][0] = productList[pid][attribute] }  */}

                                    {this.attributeList(
                                        productList[pid][attribute],
                                        isSame)}
                                </div>
                            )
                    )
                })
            }


            return (
                <div className="row border m-2 p-2 bg-white shadow" key={ind} >

                    {headPart}
                    {detailPart(ind)}

                    {/*console.log('pdetails >> ', productCsvData) */}
                </div>

            )
        })


        //  WHEN USER CLICKES ANYWHERE IN THE PAGE
        let currentComp = this;
        document.addEventListener('click', (event) => {

            let eleClass = event.target.classList.value.split(' ');
            let searchRes = event.target.parentNode.parentNode;


            if (eleClass.includes('res')) {
                // WHEN USER CLICKED ON ONE OF THE OPTION
                let serId = currentComp.getSerialNo(searchRes.id);
                document.getElementById('search' + serId).value = "";
                searchRes.classList.add('d-none');

            } else {
                // WHEN USER CLICKED OUTSIDE THE OPTION
                document.getElementById('searchRes0').classList.add('d-none');
                document.getElementById('searchRes1').classList.add('d-none');
                document.getElementById('searchRes2').classList.add('d-none');

                // HIDE BLOCK WITH CLASS RES
            }
        });


        const csvDownload = (
            <a href={arrayToCsvConverter(productCsvData)} download="my_data.csv" >
                Download csv
                </a>
        )

        console.log('---> ', productCsvData);

        return (
            <div>

                {featureList}

                {/* <div id="ele1" draggable="true" onDragStart={() => {
                    console.log('draging ');
                }}>  DRAG IT </div> */}


                <div> {csvDownload}
                </div>
            </div>
        )
    }
}