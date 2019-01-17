import {List} from 'immutable';

export class Sites {
    id: number;
    name: string;
    image: string;
    url: string;
    description: string;
    //images: List<string>;
    tags: List<string>;
    type: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.image = "";
        this.url = "";
        this.description = "";
        //this.images = List<string>();
        this.tags = List<string>();
        this.type = "";
    }
}