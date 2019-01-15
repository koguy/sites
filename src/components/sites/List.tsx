import * as React from 'react';
import {connect} from 'react-redux';
import {Table, Spin, Icon, Row, Col, Button, Divider, Popconfirm} from 'antd';
import {IApplicationState} from 'src/store';
import {Actions, ISitesState} from '../../store/sites';
import {Statuses} from '../../store/sites';
import {Link} from 'react-router-dom';

type Prop = ISitesState
    & typeof Actions.actionCreators;

interface IState {
    //siteState: ISitesListState
}

class SitesList extends React.Component<Prop, IState> {
    constructor(props){
        super(props);

        // this.state = {siteState: {
        //     status: this.props.status,
        //     data: this.props.data
        // }}
    }

    componentDidMount() {
        if (this.props.sites.status != Statuses.loaded)
            this.props.fetchList();
        if (this.props.typeOfSiteList.status != Statuses.loaded)
            this.props.fetchTypeOfSiteList();
    }

    render() {
        if (this.props.sites.status == Statuses.isLoading) {
            const antIcon = <Icon type="loading" style={{fontSize:24}} spin />
            return <Spin indicator={antIcon} />
        }
        else if (this.props.sites.status == Statuses.loaded) {
            const columns = [{
                title: 'Id',
                dataIndex: 'id',
                key:'id'
            }, {
                title: 'Url',
                dataIndex: 'url',
                key:'url'
            }, {
                title: 'Name',
                dataIndex: 'name',
                key:'name'
            }, {
                title: 'Type',
                dataIndex: 'type',
                key: 'type'
            }, {
                title: 'Action',
                key:'action',
                render: (text, record) => (
                    <span>
                        <Link to='/site/view' onClick={() => this.props.setCurrent(record)}>View</Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname: '/site/edit', state: {isNew: false} }} onClick={() => this.props.setCurrent(record.id)}>Edit</Link>
                        <Divider type="vertical" />
                        <Popconfirm title="Are you sure delete this site?" onConfirm={() => this.props.delete(record.id)} >
                            <a href='#'>Delete</a>
                        </Popconfirm>
					</span>
                )
            }];

            let data: Array<any> = [];
            //let sites = this.props.sites.data;
            this.props.sites.data.forEach(item => 
                data.push({
                    key: item.id.toString(),
                    id: item.id,
                    url: item.url,
                    name: item.name
                }));

            // for(var i=0; i<=2; i++) {
            //     data.push({
            //         key: sites[i].id.toString(),
            //         id: sites[i].id,
            //         url: sites[i].url,
            //         name: sites[i].name
            //     })
            // }

            return <div>
                <Row>
                    <Col>
                        <Button><Link to={{pathname: '/site/create', state: {isNew: true}}} onClick={() => this.props.clearCurrent()} >Create</Link></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>
                </div>
        }
        else {
            return <div>Loading is failed</div>
        }
    }
}

export default connect(
    (state: IApplicationState) => state.sites,
    Actions.actionCreators
)(SitesList);