import React from 'react';
import { Tabs } from 'antd';
import { Layout,Row,Col } from 'antd';
import RegistrationForm from './RegistrationForm';
import AllMember from './AllMember';
import VisitComponent from './VisitCompoent';

const {Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class ContentControl extends React.Component {

  render() {
    return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="All member" key="1">
        <Layout style={{}}>
          <AllMember/>
        </Layout>
      </TabPane>
      <TabPane tab="Search Member" key="2">
        <VisitComponent />
      </TabPane>
      <TabPane tab="Add Member" key="3">
        <RegistrationForm />
      </TabPane>
    </Tabs>
    );
  }
}
export default ContentControl;
