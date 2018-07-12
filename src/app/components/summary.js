import React from "react";


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

    componentDidMount() {
        console.log('[COMPONENT DID MOUNT ]');
    }


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
        console.log('dragging ', ev.target);
        ev.dataTransfer.setData("draggedProductInd", ind);
        ev.dropEffect = "move";
    }


    draggingOver(ev) {
        ev.target.style = { "color": "red" }
        ev.preventDefault();
        // // Set the dropEffect to move
        // ev.dataTransfer.dropEffect = "move";
    }

    onDropping(ev, ind) {
        ev.preventDefault();
        // event.stopPropagation()
        let draggedProductInd = ev.dataTransfer.getData('draggedProductInd');
        //.. FIRE ACTION WHICH INTERCHANGE SERIAL ID IN SELECTED PRODUCT
        this.props.productSwip(draggedProductInd, ind)
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

        productCsvData[0] = [...features];

        console.log('csvdetails ', productCsvData);

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
            detailPart = productSelected.map((pid, ind) => {

                let searchTxtId = "search" + ind;
                let searchResId = "searchRes" + ind;
                // let imageId = "pImg" + ind

                let result = null;
                let currentComp = this;

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
                                        currentComp.props.productSelect(ind, resid);
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

                // CSV DATA D-2............
                productCsvData[ind] = new Array( features.length );
                

                return (

                    (attribute == "Image") ?
                        (
                            <div className="col border-right" key={ind}>

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

                                    onDragStart={(ev) => this.dragStart(ev, ind)}
                                    onDragOver={(ev) => this.draggingOver(ev)}
                                    onDrop={(ev) => this.onDropping(ev, ind)}

                                    src={"app/images/" + productList[pid][attribute]} />
                            </div >

                        )
                        : (
                            <div className="col border-right" key={ind}>
                                {productCsvData[ind][0] = productList[pid][attribute]}

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

                    {console.log('pdetails >> ', productCsvData)}
                </div>

            )
        })


        //  WHEN USER CLICKES ANYWHERE IN THE PAGE
        let currentComp = this;
        document.addEventListener('click', (event) => {
            // var isClickInside = true;//specifiedElement.contains(event.target);
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



        // FOR CONVERTING INTO CSV DATA..

        const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        let encodedUri = encodeURI(csvContent);

        const csvDownload = (
            <a href={encodedUri} download="my_data.csv" >
                Download csv
                </a>
        )

        // var link = document.createElement("a");
        // link.setAttribute("href", encodedUri);
        // link.setAttribute("download", "my_data.csv");
        // link.innerHTML = "Click Here to download";
        // document.body.appendChild(link); // Required for FF


        return (
            <div>

                {featureList}

                {/* <div id="ele1" draggable="true" onDragStart={() => {
                    console.log('draging ');
                }}>  DRAG IT </div> */}



                <div id="target" onDrop={(ev) => {
                    ev.preventDefault();
                    console.log('on drop ', ev.target)
                    // Get the id of the target and add the moved element to the target's DOM
                    var data = ev.dataTransfer.getData("le");

                    // CUT THIS ELEMENT AND 
                    ev.target.appendChild(document.getElementById(data));
                }}
                    onDragOver={(ev) => {
                        ev.target.style = { "color": "red" }
                        ev.preventDefault();
                        console.log('dragging over ', ev.target);
                        // Set the dropEffect to move
                        ev.dataTransfer.dropEffect = "move";
                    }}>

                    Mango</div>


                <div> {csvDownload}
                </div>
            </div>
        )
    }
}