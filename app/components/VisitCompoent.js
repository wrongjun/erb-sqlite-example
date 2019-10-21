import React from 'react';
import { Row,Col,Button,Input,Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import {getOne,getPercentage,submitVisited} from '../database/databaseFunc';

const {Text} = Typography;


class ContentControl extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userData:'',
      visits:'',
    }
  }

  searchID = async(e) =>{
    //get user data
    let handleUserData=(d)=>{
      this.setState({userData:d})
      this.setState({visits:d.visits})
      console.log(this.state.userData)
    }
    console.log(e.target.value)

    getOne(e.target.value,handleUserData)

  }

  handleVisited=()=>{
    console.log("i am visited");
    if (this.state.userData.member_id){
      submitVisited(this.state.userData.member_id)
      this.setState({visits: this.state.visits+1})
    }

  }
  handleBirthdayCheck=()=>{
    console.log("Birthday Check");
  }


  render() {
    return (
      <div style={{'fontSize':20}}>
        <Input
          placeholder="input search id"
          size="large"
          onChange={this.searchID}
        />
        <Row>
            <Col span={6} offset={6}>
              ID:
            </Col>
            <Col span={6}>
              {this.state.userData.member_id}
            </Col>
          </Row>

        <Row>
            <Col span={6} offset={6}>Name:</Col>
            <Col span={6}>
              <Text>{(this.state.userData.first_name)?this.state.userData.first_name + '  '  +this.state.userData.last_name:''}</Text>
            </Col>
            <Col span={6}>
              <Text></Text>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}> Birthday: </Col>
            <Col span={6}>{this.state.userData.birthday}</Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              Email:
            </Col>
            <Col span={6}>
            {this.state.userData.email}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              Phone:
            </Col>
            <Col span={6}>
            {this.state.userData.phone}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              Memebr Since:
            </Col>
            <Col span={6}>
            {this.state.userData.validation_time}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              VIP OFFER:
            </Col>
            <Col span={6}>
            {(this.state.userData.percentage) ? this.state.userData.percentage + '%':' '}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              Visits:
            </Col>
            <Col span={6}>
            {this.state.visits}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
              <Button style={{'width':'100%'}} onClick={this.handleVisited}>visit</Button>
              </Col>
            <Col span={6}>
              <Button style={{'width':'100%'}} onClick={this.handleBirthdayCheck}>free for birthday</Button>
              </Col>
          </Row>


      </div>
    );
  }
}
export default ContentControl;
