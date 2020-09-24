import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import { validateMessages, fetchCreateData } from '../utils';
import './AddTrainee.scss';

class AddTrainee extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    finishFrom = ({trainee}) => {
    const requestUrl = `http://localhost:8080/trainees`
    fetchCreateData(requestUrl, 'POST', trainee).then(res => {
      // this.getTrainee();
      // this.getGroup();
      this.props.history.push('/');
    }).catch(e => {
      console.log(e)
    })
    }

    cancelToHome = () => {
        this.props.history.push('/');
    }

    render() {

        return (
            <div className="add-trainee-view">
            <Form className="add-trainee-from" labelCol={{span: 4}} wrapperCol={{span: 16}} name="add-val" onFinish={this.finishFrom} validateMessages={validateMessages}>
                <Form.Item name={['trainee', 'name']} label="姓名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['trainee', 'email']} label="邮箱" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['trainee', 'office']} label="办公室" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['trainee', 'zoomId']} label="Zoom ID" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['trainee', 'github']} label="Github账号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 20, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    确定
                    </Button>
                    <Button  id="cancel-btn"onClick={this.cancelToHome}>取消</Button>
                </Form.Item>
            </Form>
            </div>
        )
    }
}

export default AddTrainee;