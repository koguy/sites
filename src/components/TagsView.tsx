import * as React from 'react';
import {Tag, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Actions as filterActions, FilterType} from '../store/filter';
import {Actions as sitesActions} from '../store/sites';
import {filterByTag} from '../helpers/allSites';

interface IProps {
    data: string[]
}

type Prop = typeof filterActions.actionCreators
                & typeof sitesActions.actionCreators;

class TagsView extends React.Component<Prop & IProps, any> {
    constructor(props) {
        super(props);
    }

    handleTagClicked(value) {
        this.props.setFilter({title:value, value: value, type: FilterType.byTag});
        filterByTag(value);
    }

    render() {
        const colors = [
            "magenta",
            "red",
            "volcano",
            "orange",
            "gold",
            "lime",
            "green",
            "cyan",
            "blue",
            "geekblue",
            "purple"
        ];
        let data = [];
        this.props.data.forEach((tag, index) => {
            data.push(
                <Tag 
                    key={index}
                    color={colors[Math.floor(Math.random()*colors.length)]}>
                    <Link to='/' onClick={() => this.handleTagClicked(tag)}>
                        {tag}
                    </Link>
                </Tag>
            );
        });
        return <div style={{marginTop: '5px'}}><Icon type="tags" />: {data}</div>
    }
}

export default connect(
    null,
    {...filterActions.actionCreators, ...sitesActions.actionCreators}
)(TagsView);