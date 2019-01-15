import {List} from 'immutable';
import {TypeOfSite} from './TypeOfSite';

export class Sites {
    id: number;
    name: string;
    image: string;
    url: string;
    description: string;
    //images: List<string>;
    tags: List<string>;
    type: TypeOfSite;

    constructor() {
        this.id = -1;
        this.name = "";
        this.image = "";
        this.url = "";
        this.description = "";
        //this.images = List<string>();
        this.tags = List<string>();
        this.type = new TypeOfSite();
    }
}