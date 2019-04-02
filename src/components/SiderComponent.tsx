import * as React from 'react';
import { Layout, Menu, Icon, Row, Col,  } from 'antd';
import {connect} from 'react-redux';
import {IApplicationState} from '../store/index';
import {Actions as categoryActions} from '../store/category';
import { Category } from 'src/models/Category';
import Search from '../components/Search';
import {Actions as headingActions} from '../store/heading';
import {Actions as filterActions, FilterType} from '../store/filter';
import {filterByHeading, listRecentlyAdded} from '../helpers/allSites';
import CategoryIcon from './CategoryIcon';
import HeadingIcon from './HeadingIcon';

type Prop = typeof categoryActions.actionCreators
            & typeof headingActions.actionCreators
            & typeof filterActions.actionCreators
            & {categoryList: Category[]};


class SiderComponent extends React.Component<Prop> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCategoryList();
    }

    renderMenuItem(category: Category) {
        const headings =[];
        category.headings.forEach((heading, index) => {
            headings.push(
                <Menu.Item className="left-menu menuitem"
                    key={index} 
                    onClick={() => { 
                        this.props.setFilter({title: heading.name, value: heading.id.toString(), type: FilterType.byHeading});
                        filterByHeading(heading.id);
                    }}>
                        <HeadingIcon iconName={heading.iconName} />
                        {heading.name}
                </Menu.Item>
            );
        });
        return headings;
    }

    renderSubMenu() {
        const categories = [];
        this.props.categoryList.forEach((category, index) => {
            categories.push(
                <Menu.SubMenu
                    key={'sub' + index.toString()} 
                    title={
                        <span className="left-menu submenu">
                            <CategoryIcon iconName={category.iconName} />
                            {category.name}
                        </span>}>
                            {this.renderMenuItem(category)}
                </Menu.SubMenu>
            );
        });
        return categories;
    }

    render() {
        if (this.props.categoryList.length > 0)
            return <Layout.Sider
                className="content sider"
                width={300}>
                {/* <Search /> */}
                <Menu
                    className="left-menu"
                    mode="inline">
                    <Menu.Item
                        key={-1}
                        className="left-menu submenu"
                        onClick={() => {
                            this.props.setFilter({title: "Недавно добавленные", value:"", type: FilterType.recent});
                            listRecentlyAdded(10);
                        }}>
                        <img src="icons/time.png" className="category-icon" />
                            Недавно добавленные
                    </Menu.Item>
                    {this.renderSubMenu()}
                </Menu>
            </Layout.Sider>;
        else
            return <div></div>;
    }
}

export default connect(
    (state: IApplicationState) =>{ return { categoryList: state.categoryList }},
    {
        ...categoryActions.actionCreators,
        ...headingActions.actionCreators,
        ...filterActions.actionCreators
    }
)(SiderComponent);
