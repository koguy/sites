import * as React from 'react';
import {connect} from 'react-redux';
import {IApplicationState} from '../../store/index'
import {Sites} from '../../models/Sites';
import {Col, Row, Card, List, Avatar, Icon, Divider, Tag} from 'antd';
import {Actions as sitesActions} from '../../store/sites';
import TagsView from '../TagsView';
import HeadigsIcon from '../HeadingIcon';
import HeadingIcon from '../HeadingIcon';

type Props = {
    data: Array<Sites>
} 
    & typeof sitesActions.actionCreators;

interface IState {}

class SitesList extends React.Component<Props, IState> {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        if (this.props.data.length == 0)
            this.props.fetchList();
    }

    renderCardList() {
        let result = [];

        this.props.data.forEach(site => {
            result.push({
                href: "http://" + site.url,
                title: site.url.toUpperCase(),
                avatar: site.image || "img\\no_photo.png",
                description: site.description,
                tags: site.tags,
                iconName: site.heading.iconName,
            });
        });
            
        return result;
    }

    render(){
        if (this.props.data.length > 0)
            return <Row>
                <Col>
                    <List
                        dataSource={this.renderCardList()}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                            >
                                <List.Item.Meta
                                    avatar={<img src={"icons/site.png"} />}
                                    title={<span><a className="site-url" href={item.href} target="_blank">{item.title}</a></span>}
                                    description={<div>
                                        <Row>
                                            <Col>
                                                <span>{item.description}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TagsView data={item.tags} />
                                            </Col>
                                        </Row>
                                    </div>}
                                />
                            </List.Item>
                        )}/>
                </Col>
            </Row>
        else 
            return <div></div>;
    }
}


export default connect(
    (state: IApplicationState) => {
        return {
            data: state.sites
        }
    },
    sitesActions.actionCreators    
)(SitesList);