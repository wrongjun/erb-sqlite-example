import React from 'react';
import {createOrOpenDB,memberRegister} from '../database/databaseFunc';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
  } from 'antd';

  const { Option } = Select;

  class RForm extends React.Component {
    componentDidMount(){
      // create database if not exist
      // check every time when this component init
      createOrOpenDB();
    }

    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        // Should format date value before submit.
        const values = {
          'wechat_id': 'None',
          ...fieldsValue,
          'birthday': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        };
        //console.log('Received values of form: ', values);
        memberRegister(values);

      });

    };

    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };


    render() {
      const { getFieldDecorator } = this.props.form;

      const { autoCompleteResult } = this.state;

      const formItemLayout = {
        labelCol: {
            span:8
        },
        wrapperCol: {
            span:10
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 5,
            offset: 0,
          },
          sm: {
            span: 12,
            offset: 8,
          },
        },
      };

      return (
        <div >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
                  label='Code' style={{'fontSize':20}}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Scan barcode', whitespace: true }],
                  })(<Input />)}
          </Form.Item>
          <Form.Item
                  label='Wechat ID'>
                  {getFieldDecorator('wechatID', {
                    rules: [{ message: 'Wechat ID', whitespace: true }],
                  })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input style={{ fontSize: 20 }}/>)}
          </Form.Item>
          <Row gutter={8}>
              <Col span={6} offset={6}>
              <Form.Item
                label='First Name'>
                {getFieldDecorator('fName', {
                  rules: [{ required: true, message: 'Please input your First name!', whitespace: true }],
                })(<Input style={{ fontSize: 20 }}/>)}
              </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label='Last Name'>
                  {getFieldDecorator('lName', {
                    rules: [{ required: true, message: 'Please input your Last name!', whitespace: true }],
                  })(<Input style={{ fontSize: 20 }}/>)}
                </Form.Item>
              </Col>
            </Row>
          <Form.Item label="Birthday">
            {getFieldDecorator('date-picker', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(<DatePicker style={{'fontSize':20}}/>)}
          </Form.Item>

          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item>

          <Form.Item label="VIP">
          {getFieldDecorator('vipType', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="0">25%</Option>
              <Option value="1">40%</Option>
            </Select>,
          )}
        </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

        </Form>
        </div>
      );
    }
  }

const RegistrationForm = Form.create({ name: 'register' })(RForm);

export default RegistrationForm;
