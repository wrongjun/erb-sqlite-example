import { Table, Input, Button, Icon,Row,Col,Layout,Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import {getAllMembers,getOne} from '../database/databaseFunc'
const {Content } = Layout;


class AllMember extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchText: '',
      data :'',
      userData:'',
      visits:'',
    }
  }


  componentDidMount(){
    this.refreshData();
  }


  refreshData=()=>{
    let handleAllData=(err,d)=>{
      this.setState({data:d})
    }
    getAllMembers(handleAllData)
    console.log(this.state.data)
  }
  /*
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });
  */
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleClick=(d,rowIndex)=>{
    let handleUserData=(d)=>{
      this.setState({userData:d})
      this.setState({visits:d.visits})
      console.log(this.state.userData)
    }
    console.log(d.member_id)

    getOne(d.member_id,handleUserData)

  }

  render() {
    const columns = [
      {
        title: 'Code',
        dataIndex: 'member_id',
        width: '15%',
        render: (member_id, record) => (
          <Typography.Text style={{ fontSize: 20 }}>
            {member_id}
          </Typography.Text>
        )
        //...this.getColumnSearchProps('name'),
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        width: '20%',
        render: (first_name, record) => (
          <Typography.Text style={{ fontSize: 20 }}>
            {first_name}
          </Typography.Text>
        )
        //...this.getColumnSearchProps('age'),
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        width:'20%',
        render: (last_name, record) => (
          <Typography.Text style={{ fontSize: 20 }}>
            {last_name}
          </Typography.Text>
        )
        //...this.getColumnSearchProps('address'),
      },
    ];
    return(


    <Row>
      <Col span={12}><Content style={{backgroundColor:'white','fontSize':20,height:600}}>
      <div >
        <div >
          <Button onClick={this.refreshData} >Refresh</Button>
        </div>
        <Table columns={columns} dataSource={this.state.data}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {this.handleClick(record,rowIndex)}, // click row
                onDoubleClick: event => {}, // double click row
                onContextMenu: event => {}, // right button click row
                onMouseEnter: event => {}, // mouse enter row
                onMouseLeave: event => {}, // mouse leave row
              };
            }}
        />
      </div>



      </Content>

      </Col>
      <Col span={12}><Content style={{}}>
        <div style={{'fontSize':20}} >
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
              {(this.state.userData.first_name)?this.state.userData.first_name + '  '  +this.state.userData.last_name:''}
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
              Valid Date:
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
        </div>



      </Content></Col>
    </Row>

    )
  }
}

export default AllMember;
