var PouchDB = require('pouchdb').default;
const eventDb = new PouchDB('events', {skip_setup: true});
const {v4: uuidv4} = require('uuid');
const jsonEventData = require('./events.json');

eventDb.info().then(function (details) {
    if (details.doc_count === 0 && details.update_seq === 0) {
        console.log("db not exists");
        jsonEventData.forEach(item => {
            item._id = uuidv4();
            eventDb.put(item);
        });
    } else {
        console.log('db exits');
        /*eventDb.destroy().then(function () {
            console.log('test db removed');
        });*/
    }
})
    .catch(function (err) {
        console.log('error: ' + err);
        return;
    });


