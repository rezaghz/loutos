<template>
  <div class="prayer-time">
    <span class="d-block text-center title mb-3">اوقات شرعی به افق شهر ها</span>
    <div class="d-flex justify-content-center align-items-center ">
      <div class="col-md-6">
        <select class="form-control form-control-sm" @change="changeProvince" v-model="province_id">
          <template v-for="province in provinces">
            <option :value="province.id">{{ province.title }}</option>
          </template>
        </select>
      </div>
      <div class="col-md-6">
        <select class="form-control form-control-sm" @change="loadPrayerTime" v-model="city_id">
          <template v-for="(city,index) in cities">
            <option :value="city.id">{{ city.title }}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="row p-3 mt-2 prayer-detail">
      <div class="col-md-6">
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small  ml-1"><b>اذان صبح : </b></span>
          <span class="small">{{ prayer_time.fajr }}</span>
        </div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>طلوع خورشید : </b></span>
          <span class="small">{{ prayer_time.sunrise }}</span>
        </div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>اذان ظهر :</b></span>
          <span class="small">{{ prayer_time.dhur }}</span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="clearfix"></div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>غروب خورشید :</b></span>
          <span class="small">{{ prayer_time.asr }}</span>
        </div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>اذان مغرب  : </b></span>
          <span class="small">{{ prayer_time.maghrib }}</span>
        </div>
        <div class="clearfix"></div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>نیمه شب شرعی : </b></span>
          <span class="small">{{ prayer_time.isha }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const adhan = require('../../assets/adhan.esm.min');
import find from "pouchdb-find";
import PouchDB from "pouchdb";
import moment from "moment-timezone";

PouchDB.plugin(find);
const provincesDb = new PouchDB('provinces');
const citiesDb = new PouchDB('cities');

export default {
  data() {
    return {
      provinces: [],
      province_id: 24,
      cities: [],
      prayer_time: {
        fajr: '',
        sunrise: '',
        dhur: '',
        asr: '',
        maghrib: '',
        isha: '',
      },
      city_id: 358,
    }
  },
  mounted() {
    this.loadProvinces();
  }, methods: {
    loadProvinces() {
      let self = this;
      provincesDb.allDocs({
        include_docs: true,
        attachments: true
      }, function (err, response) {
        if (err) {
          return console.log(err);
        }
        let rows = response.rows.sort((a, b) => a.doc.title.localeCompare(b.doc.title));
        rows.forEach(r => {
          self.provinces.push(r.doc);
        });
        self.loadCities(self.province_id);
      });
    },
    changeProvince() {
      this.loadCities(this.province_id)
    },
    loadCities(province_id) {
      let self = this;
      self.cities = [];
      citiesDb.createIndex({
        index: {
          fields: ['province_id']
        }
      }).then(function () {
        citiesDb.find({
          selector: {
            province_id: province_id,
          },
        }).then(function (result) {
          let docs = result.docs.sort((a, b) => a.title.localeCompare(b.title));
          self.cities = docs;
          self.city_id = self.cities[0].id;
          self.loadPrayerTime();
        }).catch(function (err) {
          console.log(err);
        });
      });
    },
    loadPrayerTime() {
      let self = this;
      citiesDb.createIndex({
        index: {
          fields: ['id']
        }
      }).then(function () {
        citiesDb.find({
          selector: {
            id: self.city_id,
          },
        }).then(function (result) {
          let docs = result.docs;
          if (docs.length > 0) {
            let city = docs[0];
            console.log(city);
            const coordinates = new adhan.Coordinates(city.latitude, city.longitude);
            const params = adhan.CalculationMethod.Tehran();
            const date = new Date();
            const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
            self.prayer_time = {
              fajr: moment(prayerTimes.fajr).format("h:mm"),
              sunrise: moment(prayerTimes.sunrise).format("h:mm"),
              dhur: moment(prayerTimes.dhuhr).format("h:mm"),
              asr: moment(prayerTimes.asr).format("h:mm"),
              maghrib: moment(prayerTimes.maghrib).format("h:mm"),
              isha: moment(prayerTimes.isha).format("h:mm"),
            }
          }
        }).catch(function (err) {
          console.log(err);
        });
      });
    },
  }

}
</script>

<style scoped>

</style>