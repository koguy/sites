import * as React from 'react';

interface Prop {
    iconName: string
}

export default class CategoryIcon extends React.Component<Prop> {
    render() {
        return <img 
            className="category-icon"
            src={"icons/categories/" + this.props.iconName + ".png"} />
    }
}