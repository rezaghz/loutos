const PouchDB = require('pouchdb').default;
const eventDb = new PouchDB('events');
const provinceDb = new PouchDB('provinces');
const cityDb = new PouchDB('cities');
const {v4: uuidv4} = require('uuid');
const jsonEventData = require('./events.json');
const jsonProvinceData = require('./provinces.json');
const jsonCityData = require('./cities.json');

let runner = async () => {
    try {
        let details = await eventDb.info();
        if (details.doc_count === 0 && details.update_seq === 0) {
            console.log("events database not exists");
            jsonEventData.forEach(item => {
                item._id = uuidv4();
                eventDb.put(item);
            });
        } else {
            console.log('events database exits');
        }
    } catch (err) {
        console.log(err);
    }


    try {
        let details = await provinceDb.info();
        if (details.doc_count === 0 && details.update_seq === 0) {
            console.log("province database not exists");
            jsonProvinceData.forEach(item => {
                item._id = uuidv4();
                provinceDb.put(item);
            });
        } else {
            console.log('province database exists');
        }
    } catch (err) {
        console.log(err);
    }


    try {
        let details = await cityDb.info();
        if (details.doc_count === 0 && details.update_seq === 0) {
            console.log("cityDb not exists");
            jsonCityData.forEach(item => {
                item._id = uuidv4();
                cityDb.put(item);
            });
        } else {
            console.log('city eventsDb exits');
        }
    } catch (err) {
        console.log(err);
    }
}

runner();

