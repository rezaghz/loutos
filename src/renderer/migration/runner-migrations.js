var PouchDB = require('pouchdb').default;
const eventDb = new PouchDB('events', {skip_setup: true});
const provinceDb = new PouchDB('provinces', {skip_setup: true});
const cityDb = new PouchDB('cities', {skip_setup: true});
const {v4: uuidv4} = require('uuid');
const jsonEventData = require('./events.json');
const jsonProvinceData = require('./provinces.json');
const jsonCityData = require('./cities.json');

eventDb.info().then(function (details) {
    if (details.doc_count === 0 && details.update_seq === 0) {
        console.log("eventsDb not exists");
        jsonEventData.forEach(item => {
            item._id = uuidv4();
            eventDb.put(item);
        });
    } else {
        console.log('events eventsDb exits');
        /*eventDb.destroy().then(function () {
            console.log('test eventsDb removed');
        });*/
    }
})
    .catch(function (err) {
        console.log('error: ' + err);
        return;
    });

provinceDb.info().then(function (details) {
    if (details.doc_count === 0 && details.update_seq === 0) {
        console.log("provinceDb not exists");
        jsonProvinceData.forEach(item => {
            item._id = uuidv4();
            provinceDb.put(item);
        });
    } else {
        console.log('province eventsDb exists');
        /*provinceDb.destroy().then(function () {
            console.log('test eventsDb removed');
        });*/
    }
})
    .catch(function (err) {
        console.log('error: ' + err);
        return;
    });

cityDb.info().then(function (details) {
    if (details.doc_count === 0 && details.update_seq === 0) {
        console.log("cityDb not exists");
        jsonCityData.forEach(item => {
            item._id = uuidv4();
            cityDb.put(item);
        });
    } else {
        console.log('city eventsDb exits');
        /*cityDb.destroy().then(function () {
            console.log('test eventsDb removed');
        });*/
    }
})
    .catch(function (err) {
        console.log('error: ' + err);
        return;
    });


