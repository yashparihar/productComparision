import React from 'react';


class DesignTemplate extends React.Component {

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-sm navbar-inverse navbar-global navbar-fixed-top">
                    {/* navbar navbar-inverse navbar-global navbar-fixed-top */}
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

               <div className="container-fluid"> 

                <div className="row m-3 ">
                    <div className="card sm-2 m-2">
                        <span> card element 1  </span>
                        <div className="card-body">
                            <h5 className="card-title">card title</h5>
                            <p className="card-text">With sudditional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>

                        <div className="card-footer">
                            2 days ago
                        </div>
                    </div>

                    <div className="card col-sm-4 m-2 myGroup">

                        <div className="card-header">

                            <ul className="nav nav-tabs card-header-tabs ">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="collapse" href="#eleA" data-parent="#myGroup"
                                        role="button" aria-expanded="false" >
                                        Active</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#eleB" data-parent="#myGroup"
                                        role="button" aria-expanded="false" >
                                        Link</a>
                                </li>

                            </ul>
                        </div>

                        <div className="card-body accordion-group">
                            <h5 className="card-title">card title</h5>
                            <div id="eleA" className="card-text collapse">
                                This is content A </div>

                            <div id="eleB" className="card-text collapse">
                                B is the content </div>

                        </div>
                    </div>

                    {/* <div className="card col-3 m-1">
                        <span> card element 1  </span>
                    </div> */}

                    <div className="card col-sm-3 ml-auto">
                        <div className="card-header">
                            Featured
                     </div>


                        <div className="card-body">
                            <h5 className="card-title">card title</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                </div>

            </div>

                {/* <div id="myGroup">
                    <button className="btn dropdown" data-toggle="collapse" data-target="#keys" data-parent="#myGroup"><i className="icon-chevron-right"></i> Keys  <span className="badge badge-info pull-right">X</span></button>
                    <button className="btn dropdown" data-toggle="collapse" data-target="#attrs" data-parent="#myGroup"><i className="icon-chevron-right"></i> Attributes</button>
                    <button className="btn dropdown" data-toggle="collapse" data-target="#edit" data-parent="#myGroup"><i className="icon-chevron-right"></i> Edit Details</button>

                    <div className="accordion-group">
                        <div className="collapse indent" id="keys">
                            keys
        </div>

                        <div className="collapse indent" id="attrs">
                            attrs
        </div>

                        <div className="collapse" id="edit">
                            edit
        </div>
                    </div>
                </div> */}


            </div >
        )
    }
}

export default DesignTemplate;




