<template>
  <div id="wrapper">
    <div class="dashboard">
      <div class="page">
        <div class="head">
          <span class="d-block h5 pr-2 pt-2">تبدیل تاریخ</span>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="tools pb-5 pt-5">
        <div class="d-flex justify-content-center align-items-center pb-5">

          <div class="col-md-3">
            <label for="type">نوع تبدیل</label>
            <select id="type" @change="changeType()" class="form-control" v-model="type">
              <option selected="selected" value="1">خورشیدی (جلالی) به میلادی و قمری</option>
              <option value="0">میلادی به خورشیدی (جلالی) و قمری</option>
              <option value="2">قمری به خورشیدی (جلالی) و میلادی</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="day">روز</label>
            <select id="day" v-model="day" class="form-control">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <div class="col-md-3">
            <label>ماه</label>
            <select v-model="jalali_month" class="form-control" v-show="type === '1' ">
              <option value="1">فروردین-ماه اول</option>
              <option value="2">اردیبهشت-ماه دوم</option>
              <option value="3">خرداد-ماه سوم</option>
              <option value="4">تیر-ماه چهارم</option>
              <option value="5">مرداد-ماه پنجم</option>
              <option value="6">شهریور-ماه ششم</option>
              <option value="7">مهر-ماه هفتم</option>
              <option value="8">آبان-ماه هشتم</option>
              <option value="9">آذر-ماه نهم</option>
              <option value="10">دی-ماه دهم</option>
              <option value="11">بهمن-ماه یازدهم</option>
              <option value="12">اسفند-ماه دوازدهم</option>
            </select>
            <select v-model="gregorian_month" class="form-control" v-show="type === '0'">
              <option value="1">January-ماه اول</option>
              <option value="2">February-ماه دوم</option>
              <option value="3">March-ماه سوم</option>
              <option value="4">April-ماه چهارم</option>
              <option value="5">May-ماه پنجم</option>
              <option value="6">June-ماه ششم</option>
              <option value="7">July-ماه هفتم</option>
              <option value="8">August-ماه هشتم</option>
              <option value="9">September-ماه نهم</option>
              <option value="10">October-ماه دهم</option>
              <option value="11">November-ماه یازدهم</option>
              <option value="12">December-ماه دوازدهم</option>
            </select>
            <select v-model="hijri_month" class="form-control" v-show="type === '2'">
              <option value="1">محرم-ماه اول</option>
              <option value="2">صفر-ماه دوم</option>
              <option value="3">ربیع الاول-ماه سوم</option>
              <option value="4">ربیع الثانی-ماه چهارم</option>
              <option value="5">جمادی الاول-ماه پنجم</option>
              <option value="6">جمادی الثانیه-ماه ششم</option>
              <option value="7">رجب-ماه هفتم</option>
              <option value="8">شعبان-ماه هشتم</option>
              <option value="9">رمضان-ماه نهم</option>
              <option value="10">شوال-ماه دهم</option>
              <option value="11">ذوالقعده-ماه یازدهم</option>
              <option value="12">ذوالحجه-ماه دوازدهم</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="year">سال</label>
            <input type="text" id="year" v-model="year" class="form-control">
          </div>
          <div class="col-md-2">
            <label class="invisible ">بررسی</label>
            <button @click="convert()" class="btn btn-block text-white" id="submit">
              تبدیل
            </button>
          </div>
        </div>
        <div class="clearfix"></div>
        <hr>
        <div class="d-flex pt-5">
          <div class="col-md-4 d-flex flex-column justify-content-around d-block text-center ">
            <h5 class="font-weight-bold text-danger">شمسی :</h5>
            <span class="pt-4">{{ jalali_convert_date }}</span>
            <span class="pt-4">{{ jalali_convert_numeral }}</span>
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-around d-block text-center ">
            <h5 class="font-weight-bold text-danger">قمری :</h5>
            <span class="pt-4">{{ hijri_convert_date }}</span>
            <span class="pt-4">{{ hijri_convert_numeral }}</span>
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-around d-block text-center ">
            <h5 class="font-weight-bold text-danger">میلادی :</h5>
            <span class="pt-4">{{ gregorian_convert_date }}</span>
            <span class="pt-4">{{ gregorian_convert_numeral }}</span>
          </div>
        </div>
      </div>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from '../Partials/Sidebar';

export default {
  name: "convert-dates",
  components: {
    Sidebar
  },
  data() {
    return {
      // Type 0 => Gregorian Calendar , Type 1 => Jalali Calendar , Type 2 => Hijri Calendar
      type: "1",
      day: 1,
      //
      jalali_month: 1,
      jalali_convert_date: "",
      jalali_convert_numeral: "",
      //
      gregorian_month: 1,
      gregorian_convert_date: "",
      gregorian_convert_numeral: "",
      //
      hijri_month: 1,
      hijri_convert_date: "",
      hijri_convert_numeral: "",
      //
      year: "1400",
    }
  },
  mounted() {
    let today = new persianDate();
    this.day = today.date();
    this.jalali_month = today.month();
    this.year = today.year();
    let date = this.convertJalaliDate();
    this.convertGregorianDate(date);
    this.convertHijriDate(date);
  },
  methods: {
    changeType() {
      let today = new persianDate();
      if (this.type === '0') {
        this.day = today.toCalendar('gregorian').date();
        this.gregorian_month = today.toCalendar('gregorian').month();
        this.year = today.toCalendar('gregorian').year();
      } else if (this.type === '1') {
        this.day = today.date();
        this.jalali_month = today.month();
        this.year = today.year();
      } else {
        let hijri_date = moment().subtract(1, 'days');
        this.day = hijri_date.iDate();
        this.hijri_month = fixNumbers(hijri_date.format("iM"));
        this.year = hijri_date.iYear();
      }
    },
    convert() {
      // Jalali Date
      if (this.type === '1') {
        let date = this.convertJalaliDate();
        this.convertGregorianDate(date);
        this.convertHijriDate(date);
      } else if (this.type === '0') {
        let date = this.convertGregorianDate();
        this.convertJalaliDate(date);
        this.convertHijriDate(date);
      } else {
        let date = this.convertHijriDate();
        this.convertJalaliDate(date);
        this.convertGregorianDate(date);
      }
    },
    convertJalaliDate(my_date) {
      if (my_date == null) {
        my_date = new persianDate([parseInt(this.year), parseInt(this.jalali_month), parseInt(this.day)]);
      } else {
        my_date.toCalendar('persian').toLocale('fa');
      }
      this.jalali_convert_date = my_date.format('dddd ، D MMMM YYYY');
      this.jalali_convert_numeral = my_date.format("YYYY/MM/D");
      return my_date;
    },
    convertGregorianDate(my_date) {
      if (my_date == null) {
        persianDate.toCalendar('gregorian');
        my_date = new persianDate([parseInt(this.year), parseInt(this.gregorian_month), parseInt(this.day)]);
        persianDate.toCalendar('persian');
      }
      this.gregorian_convert_date = my_date.toCalendar('gregorian').toLocale('en').format("dddd , MMMM D , YYYY");
      this.gregorian_convert_numeral = my_date.toCalendar('gregorian').toLocale('en').format("L");
      return my_date;
    },
    convertHijriDate(my_date) {
      let hijri_date;
      let dayOfWeek;
      if (my_date == null) {
        my_date = moment(`${parseInt(this.year)}/${parseInt(this.hijri_month)}/${parseInt(this.day)}`, 'iYYYY/iM/iD');
        hijri_date = my_date;
        dayOfWeek = new persianDate(new Date(my_date.clone().locale('en').format('YYYY/MM/DD'))).day();
      } else {
        my_date.toCalendar('gregorian').toLocale('en');
        hijri_date = moment(`${my_date.year()}-${my_date.month()}-${my_date.date()}`).subtract(1, 'days');
        dayOfWeek = my_date.day();
      }
      this.hijri_convert_date = this.getHijriWeekDay(dayOfWeek) + hijri_date.format(" ، iD iMMMM iYYYY");
      this.hijri_convert_numeral = hijri_date.format(`iYYYY/iMM/${hijri_date.iDate()}`);

      let returnDate = hijri_date.add('days', 1).locale('en').format('YYYY/MM/DD');
      return new persianDate(new Date(returnDate));
    },
    getHijriWeekDay(day) {
      let days = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه", "السبت"];
      return days[day - 1];
    }
  },


}
</script>

<style scoped>
.page {
  width: 100%;
  padding: 10px;
  cursor: default;
  border-left: 1px solid #f0f0f0;
}

.head {
  width: 100%;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 7px;
}

.tools {
  padding: 10px;
}

#submit {
  background-color: #0d47a1;
}

</style>