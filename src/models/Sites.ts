import {List} from 'immutable';
import { Heading } from './Heading';

export class Sites {
    id: number;
    name: string;
    image: string;
    url: string;
    description: string;
    tags: Array<string>;
    heading: Heading

    constructor() {
        this.id = 0;
        this.name = "";
        this.image = "";
        this.url = "";
        this.description = "";
        this.tags = [];
        this.heading = new Heading();
    }
}