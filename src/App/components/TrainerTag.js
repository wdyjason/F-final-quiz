import { Popover, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { Component } from 'react';

class TrainerTag extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
      }


    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    render() {
        const {id, name} = this.props.trainersData;
        const {visible} = this.state;

        const content = (
            <div className="trainee-tag-pop-over">
            <Tag onClick={this.showModal}>{`id:${id}`}</Tag>
            <Tag>{`名字：${name}`}</Tag>

         
            </div>
        )
        return(
            <div>
            <Popover content={content} title="详情">
            <div className="trainer-tag">{`${id}. ${name}`}</div>
            </Popover>
               <Modal title="删除" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
               <p>{`确定删除${id}？`}</p>
           </Modal>
           </div>
        )
    }
}

export default TrainerTag;