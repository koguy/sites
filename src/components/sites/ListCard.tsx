import * as React from 'react';
import {connect} from 'react-redux';
import {IApplicationState} from '../../store/index'
import {Sites} from '../../models/Sites';
import {Col, Row, Card, List, Avatar} from 'antd';

interface IProps {
    data: Array<Sites>
}

interface IState {}

export default class ListCard extends React.Component<IProps, IState> {
    constructor(props){
        super(props);
    }

    renderCardList() {
        let result = [];

        this.props.data.forEach(site => {
            result.push({
                href: "http://" + site.url,
                title: site.url.toLowerCase(),
                avatar: site.image || "img\\no_photo.png",
                description: site.description
            });
        });
            
        return result;
    }

    render(){
        if (this.props.data.length > 0)
            return <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.renderCardList()}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                avatar={<img width={272} className="siteCard img" alt="logo" src={item.avatar} />}
                                title={<a href={item.href} target="_blank">{item.title}</a>}
                                description={item.description}
                                />
                        </List.Item>
                    )}/>
        else 
            return <div></div>;
    }
}


// export default connect(
//     (state: IApplicationState) => state.sites.list,
//     null
// )(ListCard);