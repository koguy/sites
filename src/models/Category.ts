import {List} from 'immutable';
import { Heading } from './Heading';

export class Category {
    id: number;
    name: string;
    description: string;
    headings: Array<Heading>;
    iconName: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.headings = Array<Heading>();
        this.iconName = "";
    }
}