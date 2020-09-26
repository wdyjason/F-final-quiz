import { Popover, Tag } from 'antd';
import React, { Component } from 'react';

// TODO feedback：TraineeTag和TrainerTag两个组件有很多重复逻辑，可以抽象、提取成公共组件
class TraineeTag extends Component {

    render() {
        const {id, name, office, email, github, zoomId} = this.props.traineeData

        const  content = (
            <div className="trainee-tag-pop-over">
                <Tag>{`id:${id}`}</Tag>
                <Tag>{`名字：${name}`}</Tag>
                <Tag>{`办公室：${office}`}</Tag>
                <Tag>{`邮箱：${email}`}</Tag>
                <Tag>{`github账号：${github}`}</Tag>
                <Tag>{`zoom id：${zoomId}`}</Tag>
            </div>
            );

        return(
        <Popover content={content} title="详情">
        <div className="trainee-tag">{`${id}. ${name}`}</div>
        </Popover>
        )
    }
}

export default TraineeTag;
