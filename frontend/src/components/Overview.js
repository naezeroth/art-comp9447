import React,{Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button, Tabs, Tab} from 'react-bootstrap';
// import {Tabs} from 'react/bootstrap/Tabs';
// import {Tab} from 'react/bootstrap/Tab';
import {Link} from 'react-router-dom';

class Overview extends Component {
    render(){
        return(
          <div className="">
            <Jumbotron>
              <h1>Overview </h1>
              <p>
                Welcome to the temporary overview. Below you will find a bunch of methods
                to keep track of your Guardduty information.
              </p>
              <p>
                <Link to="/"><Button type="primary" >Back to Home</Button></Link>
              </p>
            </Jumbotron>

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="s3" title="S3 Bucket">
                <p>a</p>
              </Tab>
              <Tab eventKey="ic2" title="IC2 Instance">
                <p>b</p>
              </Tab>
              <Tab eventKey="iam" title="IAM Issues">
                <p>c</p>
              </Tab>
            </Tabs>

          </div>
        );
    }
}

export default Overview;
