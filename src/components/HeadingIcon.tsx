import * as React from 'react';

interface Prop {
    iconName: string,
    asAvatar?: boolean,
}

export default class HeadingIcon extends React.Component<Prop> {
    render() {
        return <img 
            className={this.props.asAvatar ? "heading-icon-avatar" : "heading-icon"}
            src={"icons/headings/" + this.props.iconName + ".png"} />
    }
}