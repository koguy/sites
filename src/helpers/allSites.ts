import {store} from '../index';
import {Actions as sitesActions} from '../store/sites';

export function filterBySearch(value: string) {
    if (isSitesEmpty()) {
        fetchBySearch(value);
        fetchAllSites();
    }
    else {
        let filteredList = store.getState().allSites.filter(o => o.url.includes(value) || o.tags.find(t => t.includes(value)));
        store.dispatch(sitesActions.setList(filteredList));
    }
}

export function filterByTag(tag: string) {
    if (isSitesEmpty()) {
        fetchByTag(tag);
        fetchAllSites();
    }
    else {
        let filteredList = store.getState().allSites.filter(o => o.tags.find(t => t.includes(tag)));
        store.dispatch(sitesActions.setList(filteredList));
    }
}

export function listRecentlyAdded(count: number) {
    if (isSitesEmpty()) {
        fetchRecentlyAdded(count);
        fetchAllSites();
    }
    else {
        //let recentlyAdded = store.getState().allSites.sort((a, b) => a.dateCreated > b.dateCreated ? -1 : a.dateCreated < b.dateCreated ? 1 : 0).slice(0, count + 1);
        let recentlyAdded = store.getState().allSites.sort((a, b) => b.id - a.id).slice(0, count + 1);
        store.dispatch(sitesActions.setList(recentlyAdded));
    }
}

export function filterByHeading(headingId: number) {
    if (isSitesEmpty()) {
        fetchListByHeading(headingId);
        fetchAllSites();
    }
    else {
        let filteredList = store.getState().allSites.filter(value => value.heading.id == headingId);
        store.dispatch(sitesActions.setList(filteredList));
    }
}

export function fetchListByHeading(headingId: number) {
    fetch("http://localhost:5000/api/sites/heading/" + headingId.toString(), {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data)
                store.dispatch(sitesActions.setList(data));
        })
        .catch(error =>
            console.error("An error occured while FETCH"));
}

export function fetchAllSites() {
    fetch("http://localhost:5000/api/sites", {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data)
                store.dispatch(sitesActions.fetchList(data));
        })
        .catch(error =>
            console.error("An error occured while FETCH"));
}

function fetchBySearch(searchingValue: string) {
    fetch("http://localhost:5000/api/sites/search/" + searchingValue, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data)
                store.dispatch(sitesActions.setList(data));
        })
        .catch(error =>
            console.error("An error occured while FETCH" + error));
}

function fetchByTag(tagValue: string) {
    fetch("http://localhost:5000/api/sites/tag/" + tagValue, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data)
                store.dispatch(sitesActions.setList(data));
        })
        .catch(error =>
            console.error("An error occured while FETCH" + error));
}


function fetchRecentlyAdded(count: number) {
    fetch("http://localhost:5000/api/sites/recent/" + count.toString(), {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data)
                store.dispatch(sitesActions.setList(data));
        })
        .catch(error =>
            console.error("An error occured while FETCH" + error));
}


export function isSitesEmpty(): boolean {
    return store.getState().allSites.length <= 0;
}