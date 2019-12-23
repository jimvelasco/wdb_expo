import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import TextFieldGroup from "../common/TextFieldGroup";
import  {Button} from 'react-bootstrap';



//import { getMeasurements } from "../../actions/measurementsActions";




class Port1700 extends Component {

    constructor(props) {
        super(props);
       // console.log("measurements props",props);
        this.pieinterval = null;
        this.state = {
          id: "network",
          json: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getSocket = this.getSocket.bind(this);
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
 
  componentDidMount() {
    // var LineChart = require("react-chartjs").Line;
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }

   console.log("Port1900 componentDidMount");
   
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Port1700 cwrp next", nextProps);
    // console.log("Port1700 cwrp cur", this.props);
   
  }

  getSocket() {
    console.log("get socket");
    let sdata = {"id": this.state.id };
    axios
    .post("/api/dashboard/socket", sdata)
    .then(res => {
        let rdata = res.data;
        // let setrobj = JSON.parse(rdata);
        // let error = setrobj['error']; //'Problem obtaining Sync data.';
        // console.log("error is", error);
        // let pjson = JSON.stringify(setrobj, null, "  ");
       // let rrdata = JSON.stringify(rdata);
        //console.log(rdata['data']);
       // console.log(rdata);
      var
        binaryString = '',
        bytes = new Uint8Array(rdata['data']),
        length = bytes.length;
      for (var i = 0; i < length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }
      //console.log(binaryString);
       let setrobj = JSON.parse(binaryString);
       // console.log("error is", error);
        let pjson = JSON.stringify(setrobj, null, "  ");
       this.setState({json: pjson})
      //console.log("actions python response data", res.data);
     
    })
    .catch(err => {
      console.log("in actions pott1900 error response");
      console.log(err);
   
    });
  }

  onSubmit(e) {
    e.preventDefault();

   console.log("submit",this.state.id);

   
    let sdata = {"id": this.state.id };
  
    axios
   .post("/api/dashboard/python", sdata)
   .then(res => {
       let rdata = res.data;
      // let setrobj = JSON.parse(rdata);
      // let error = setrobj['error']; //'Problem obtaining Sync data.';
      // console.log("error is", error);
       let pjson = JSON.stringify(rdata, null, "  ");
      // console.log(pjson);
    //    let sun = setrobj['status']['unit']['network'];
    //    console.log("status-unit-network is", sun);
    //    let network = setrobj['network'];
    //    console.log("network is", network);
    //    let nstatic = setrobj['network']['static'];
    //    console.log("network static is", nstatic);

       this.setState({json: pjson})
     //console.log("actions python response data", res.data);
    
   })
   .catch(err => {
    console.log("in actions pott1900 error response");
    console.log(err);
  
   });
    

     // this.props.modifyBusiness(formdata, this.props.history);
   
  }


  

  render() {
   
   // const { errors } = this.state;

    let {json} = this.state;


    
    return (
        <div>
            
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto shadow-lg p-4">
                            <h2 className="text-center">Port 1700  </h2>
                           
                        

                            <form noValidate onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    <TextFieldGroup
                                        type="text"
                                        label="Identifier"
                                        placeholder="Identifier"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.onChange}
                                       
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                           
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mr-2"
                            onClick={e => {
                              this.getSocket(e);
                            }}
                          >
                            socket
                              </Button>
                          <p style={{fontSize: "8pt"}}>Need to start server in socket directory using node start_server.js</p>
                          <div className="prescrolling"><pre>{json}</pre></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            </div>
    );
  }
}

// TSHome.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  {}
)(Port1700);

// export default Measurements;
