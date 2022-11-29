<template>
  <div class="prayer-time">
    <span class="d-block text-center title mb-3">اوقات شرعی به افق شهر ها</span>
    <div class="d-flex justify-content-center align-items-center ">
      <div class="col-md-6">
        <select class="form-control form-control-sm" @change="changeProvince()" v-model="province_id">
          <template v-for="province in provinces">
            <option :value="province.id">{{ province.title }}</option>
          </template>
        </select>
      </div>
      <div class="col-md-6">
        <select class="form-control form-control-sm" @change="loadPrayerTime()" v-model="city_id">
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
          <span class="small">{{ prayer_time.sunset }}</span>
        </div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1"><b>اذان مغرب  : </b></span>
          <span class="small">{{ prayer_time.maghrib }}</span>
        </div>
        <div class="clearfix"></div>
        <div class="d-flex mb-3">
          <i class="fa fa-angle-left ml-1"></i>
          <span class="small ml-1 isha"><b>نیمه شب شرعی :</b></span>
          <span class="small">{{ prayer_time.isha }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const adhan = require('@/assets/adhan.esm.min.js');
import find from "pouchdb-find";
import PouchDB from "pouchdb";
import moment from "moment-timezone";

const log = require('electron-log');

PouchDB.plugin(find);
const provincesDb = new PouchDB('provinces');

export default {
  data() {
    return {
      provinces: [],
      province_id: '',
      cities: [],
      city_id: '',
      prayer_time: {
        fajr: '',
        sunrise: '',
        dhur: '',
        sunset: '',
        maghrib: '',
        isha: '',
      },
    }
  },
  mounted() {
    let storageProvinceId = localStorage.getItem('prayer_times.province_id');
    let storageCityId = localStorage.getItem('prayer_times.city_id');
    this.province_id = storageProvinceId === null ? 24 : storageProvinceId;
    this.city_id = storageCityId === null ? 358 : storageCityId;
    this.loadProvinces();
  }, methods: {
    loadProvinces() {
      let self = this;
      provincesDb.allDocs({
        include_docs: true,
        attachments: true
      }, function (err, response) {
        if (err) {
          return log.error(err);
        }
        let rows = response.rows.sort((a, b) => a.doc.title.localeCompare(b.doc.title));
        rows.forEach(r => {
          self.provinces.push(r.doc);
        });
        self.loadCities(self.province_id, true);
      });
    },
    changeProvince() {
      localStorage.setItem('prayer_times.province_id', this.province_id);
      this.loadCities(this.province_id)
    },
    loadCities(province_id, mounted = false) {
      let self = this;
      self.cities = [];
      let citiesDb = new PouchDB('cities');
      citiesDb.createIndex({
        index: {
          fields: ['province_id']
        }
      }).then(function () {
        citiesDb.find({
          selector: {
            province_id: parseInt(province_id),
          },
        }).then(function (result) {
          if (result.docs.length > 0) {
            let docs = result.docs.sort((a, b) => a.title.localeCompare(b.title));
            self.cities = docs;
            if (!mounted) {
              self.city_id = self.cities[0].id;
            }
            self.loadPrayerTime();
          }

        }).catch(function (err) {
          log.error(err);
        });
      });
    },
    loadPrayerTime(calendarDate = null) {
      console.log(calendarDate);
      let self = this;
      let citiesDb = new PouchDB('cities');
      localStorage.setItem('prayer_times.city_id', self.city_id);
      citiesDb.createIndex({
        index: {
          fields: ['id']
        }
      }).then(function () {
        citiesDb.find({
          selector: {
            id: parseInt(self.city_id),
          },
        }).then(function (result) {
          let docs = result.docs;
          if (docs.length > 0) {
            let city = docs[0];
            let coordinates = new adhan.Coordinates(city.latitude, city.longitude);
            let params = adhan.CalculationMethod.Tehran();
            let date = new Date();
            if (calendarDate !== null) {
              date = new Date(calendarDate);
            }
            let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
            const sunnahTimes = new adhan.SunnahTimes(prayerTimes);

            console.log(prayerTimes);
            self.prayer_time = {
              fajr: moment(prayerTimes.fajr).format("H:mm"),
              sunrise: moment(prayerTimes.sunrise).format("H:mm"),
              dhur: moment(prayerTimes.dhuhr).format("H:mm"),
              sunset: moment(prayerTimes.sunset).format("H:mm"),
              maghrib: moment(prayerTimes.maghrib).format("H:mm"),
              isha: moment(sunnahTimes.middleOfTheNight).format("H:mm"),
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
.isha {
  font-size: 12px;
}
</style>