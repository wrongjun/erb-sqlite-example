// @flow
import React,{Component} from 'react';
import ContentControl from './ContentControl'
import { Layout,Button } from 'antd';
const { Header, Footer,Content } = Layout;

class Home extends Component  {

  render() {
    return (
      <div >
      <Layout>
      <Content>
            <ContentControl></ContentControl>
          </Content>
      </Layout>
      </div>
    );
  }
}

export default Home;


/*        <Layout>
          <Header>
            Membership System
          </Header>
          <Content>
            <ContentControl></ContentControl>
          </Content>
          <Footer>Footer</Footer>
            </Layout>
        */

/*
export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <Button>click to go</Button>
        </div>
      </div>
    );
  }
}
*/
