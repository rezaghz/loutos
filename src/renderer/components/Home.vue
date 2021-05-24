<template>
    <div id="wrapper">
        <div class="dashboard d-flex">
            <div class="date-table">
                <div class="date-table-header">
                    <div class="month-next" @click="prevMonth()">
                        <i class="fa fa-angle-right"></i>
                        <span>ماه قبل</span>
                    </div>
                    <div class=" month-now ">
                        <div class="clearfix"></div>
                        <span>{{shamsi_title}}</span>
                        <div class="clearfix"></div>
                        <span class="d-block mt-2 miladi_in_table ">{{miladi_title}}</span>
                        <div class="clearfix"></div>
                        <span class="d-block mt-2 qamari_in_table">{{qamari_title}}</span>
                        <div class="clearfix"></div>
                    </div>
                    <div class="month-last" @click="nextMonth()">
                        <span>ماه بعد</span>
                        <i class="fa fa-angle-left"></i>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="days-head">
                    <div class="days-head-cell"><span>ش</span></div>
                    <div class="days-head-cell"><span>ی</span></div>
                    <div class="days-head-cell"><span>د</span></div>
                    <div class="days-head-cell"><span>س</span></div>
                    <div class="days-head-cell"><span>چ</span></div>
                    <div class="days-head-cell"><span>پ</span></div>
                    <div class="days-head-cell"><span>ج</span></div>
                </div>

                <div class="days-body">
                    <div class="day-cell" @click="getDateDetail(value.year,value.month,value.shamsi_day)"
                         v-for="value in dayOfCalendar">
                        <div class="day-cell-inner">
                            <div class="day-cell-item">
                                <div class="day-cell-item-inner" :class="[{day_selected : value.disableSelected}]">
                                    <span :class="{disableStyle : value.disableStyle,vacationStyle : value.vacationStyle}">
{{value.shamsi_day}}</span>
                                </div>
                                <div class="miladi small" style="float:right">{{value.miladi_day}}</div>
                                <div class="qamari small" style="float:left">{{value.qamari_day}}</div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clear"></div>
            </div>
            <div class="dd-calendar">
                <div class="d-flex align-items-center justify-content-between dd-calendar-in mt-2">
                    <div class="calendar-in">
                        <span class="calendar-in-span">{{shamsi_header_date}}</span>
                        <div class="clearfix"></div>
                        <span class="calendar-in-span small_header d-block mt-3">{{shamsi_header_numeral}}</span>
                    </div>
                    <div class="Calendar-in">
                        <span dir="ltr" class="calendar-in-span d-inline-block miladi ">{{miladi_header_date}}</span>
                        <div class="clearfix"></div>
                        <span class="calendar-in-span small_header d-block mt-3 miladi">{{miladi_header_numeral}}</span>
                    </div>
                    <div class="calendar-in">
                        <span class="calendar-in-span">{{qamari_header_date}}</span>
                        <div class="clearfix"></div>
                        <span class="calendar-in-span small_header d-block mt-3">{{qamari_header_numeral}}</span>
                    </div>
                </div>
                <ul class="list-class-date">
               <!--     <li>
                        <a href="#" target="_blank" class="d-flex justify-content-between align-items-center">
                            <h2 class="IRANSans-Light list-class-date-s1 d-flex align-items-center"><i
                                    class="fa fa-video-camera"></i> لورم ایپسوم متن ساختگی </h2>
                            <div class="list-class-time d-flex align-items-center"><span class="list-class-time-s1">18:00</span>-<span
                                    class="list-class-time-s2">15:00</span> <i class="fa fa-angle-left"></i></div>
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" class="d-flex justify-content-between align-items-center">
                            <h2 class="IRANSans-Light list-class-date-s1 d-flex align-items-center"><i
                                    class="fa fa-video-camera"></i> لورم ایپسوم متن ساختگی </h2>
                            <div class="list-class-time d-flex align-items-center"><span class="list-class-time-s1">18:00</span>-<span
                                    class="list-class-time-s2">15:00</span> <i class="fa fa-angle-left"></i></div>
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" class="d-flex justify-content-between align-items-center">
                            <h2 class="IRANSans-Light list-class-date-s1 d-flex align-items-center"><i
                                    class="fa fa-video-camera"></i> لورم ایپسوم متن ساختگی </h2>
                            <div class="list-class-time d-flex align-items-center"><span class="list-class-time-s1">18:00</span>-<span
                                    class="list-class-time-s2">15:00</span> <i class="fa fa-angle-left"></i></div>
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" class="d-flex justify-content-between align-items-center">
                            <h2 class="IRANSans-Light list-class-date-s1 d-flex align-items-center"><i
                                    class="fa fa-video-camera"></i> لورم ایپسوم متن ساختگی </h2>
                            <div class="list-class-time d-flex align-items-center"><span class="list-class-time-s1">18:00</span>-<span
                                    class="list-class-time-s2">15:00</span> <i class="fa fa-angle-left"></i></div>
                        </a>
                    </li>-->
                </ul>
                <div class="calendar-btn d-flex justify-content-center align-items-center">
                        <i class="fa fa-plus"></i> ثبت یادآور
                    </div>
                <!--<a href="#" class="new-class d-flex align-items-center justify-content-center transition-5">
                    <i class="fa fa-video-camera"></i> شرکت در کلاس جدید
                </a>-->
                <div class="go_today" @click="goToday()" v-if="showGoTodayBtn">
                    <button class="btn rounded-circle"><i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        <sidebar></sidebar>
    </div>
</template>

<script>
    import Sidebar from './Partials/Sidebar';

    export default {
        name: 'home',
        components: {Sidebar},
        data() {
            return {
                shamsi_title: "",
                miladi_title: "",
                qamari_title: "",
                month: "",
                year: "",
                day: "",
                dayOfCalendar: [],
                disableSelected: false,
                showGoTodayBtn: false,
                CalendarCourse: [],
                shamsi_header_date: "",
                miladi_header_date: "",
                qamari_header_date: "",
                shamsi_header_numeral: "",
                miladi_header_numeral: "",
                qamari_header_numeral: "",
            }
        },
        mounted() {
            let today = new persianDate();
            this.year = today.year();
            this.month = today.month();
            this.day = today.date();
            this.shamsi_title = today.toLocale('fa').format('MMMM') + " " + this.year;
            this.createMiladiTitle(today.year(), today.month());
            this.createQamariTitle(today.year(), today.month())
            this.createHeaderDate(today.year(), today.month(), today.date());
            this.createCalendar(this.year, this.month);
        },
        methods: {
            createCalendar(year, month) {
                let dayInMonth = new persianDate([year, month]).daysInMonth();
                let beforeMonthDate = this.getBeforeMonthDate(year, month);
                let self = this;
                let today = new persianDate();
                this.dayOfCalendar = [];
                // Before Deselected Month
                if (beforeMonthDate.length > 0) {
                    beforeMonthDate.forEach(function (time) {
                        self.dayOfCalendar.push({
                            shamsi_day: time.day,
                            miladi_day: this.shamsi_to_miladi(time.year, time.month, time.day, "DD"),
                            qamari_day: this.shamsi_to_qamari(time.year, time.month, time.day, "iDD"),
                            month: time.month,
                            year: time.year,
                            date: time.date,
                            disableStyle: time.disableStyle,
                            vacationStyle: time.vacationStyle,
                            disableSelected: false,
                        });
                    }, self);
                }
                // PrimaryDay
                let counter = 1;
                for (counter = 1; counter <= dayInMonth; counter++) {
                    let createDay = new persianDate([year, month, counter]);
                    let showSelected = today.date() === createDay.date() && today.year() === createDay.year() && today.month() === createDay.month();
                    self.dayOfCalendar.push({
                        shamsi_day: createDay.date(),
                        miladi_day: this.shamsi_to_miladi(createDay.year(), createDay.month(), createDay.date(), "DD"),
                        qamari_day: this.shamsi_to_qamari(createDay.year(), createDay.month(), createDay.date(), "iDD"),
                        year: createDay.year(),
                        month: createDay.month(),
                        date: createDay.format("L"),
                        disableSelected: showSelected,
                        vacationStyle: createDay.format('dddd') === "جمعه",
                    });
                    self.disableSelected = false;
                }
                // After Date
                let afterMonthDate = this.getAfterMonthDate(year, month);
                if (afterMonthDate.length > 0) {
                    afterMonthDate.forEach(function (time) {
                        self.dayOfCalendar.push({
                            shamsi_day: time.day,
                            miladi_day: this.shamsi_to_miladi(time.year, time.month, time.day, "DD"),
                            qamari_day: this.shamsi_to_qamari(time.year, time.month, time.day, "iDD"),
                            month: time.month,
                            year: time.year,
                            date: time.date,
                            disableStyle: time.disableStyle,
                            vacationStyle: time.vacationStyle,
                            disableSelected: false,
                        });
                    }, self);
                }
            },
            createHeaderDate(persian_year, persian_month, persian_day) {
                let date = new persianDate([persian_year, persian_month, persian_day]);
                this.shamsi_header_date = date.format("D") + " " + date.toLocale('fa').format('MMMM') + " " + date.year();
                this.miladi_header_date = this.shamsi_to_miladi(persian_year, persian_month, persian_day);
                this.qamari_header_date = this.shamsi_to_qamari(persian_year, persian_month, persian_day, "iD iMMMM iYYYY");
                this.shamsi_header_numeral = date.year() + "/" + date.toLocale('fa').format('MM') + "/" + date.format("D");
                this.miladi_header_numeral = this.shamsi_to_miladi(persian_year, persian_month, persian_day, "L");
                this.qamari_header_numeral = this.shamsi_to_qamari(persian_year, persian_month, persian_day, "iYYYY/iMM/iD");
            },
            createQamariTitle(year, month) {
                let processYear = "";
                let currentMonth = this.shamsi_to_qamari(year, month,1,"iMMMM");
                let currentYear = this.shamsi_to_qamari(year, month,1,"iYYYY");
                let endMonth = this.shamsi_to_qamari(year, month,30,"iMMMM");
                let endYear = this.shamsi_to_qamari(year, month,30,"iYYYY");
                if (currentYear !== endYear){
                    processYear = " " + currentYear;
                }
                this.qamari_title = currentMonth + processYear + " - " + endMonth + " " + endYear;
            },
            createMiladiTitle(year, month) {
                let processYear = "";
                let before_month = new persianDate([year, month, 1]).toCalendar('gregorian').toLocale('en').format("MMMM");
                let before_year = new persianDate([year, month, 1]).toCalendar('gregorian').toLocale('en').format("YYYY");
                let current_month = new persianDate([year, month, 29]).toCalendar('gregorian').toLocale('en').format("MMMM");
                let current_year = new persianDate([year, month, 29]).toCalendar('gregorian').toLocale('en').format("YYYY");
                if (before_year !== current_year) {
                    processYear = " " + before_year;
                }
                this.miladi_title = before_month + processYear + " - " + current_month + " " + current_year;
            },
            goToday() {
                this.showGoTodayBtn = false;
                let today = new persianDate();
                this.year = today.year();
                this.month = today.month();
                this.day = today.date();
                this.shamsi_title = today.toLocale('fa').format('MMMM') + " " + this.year;
                this.createMiladiTitle(today.year(), today.month());
                this.createQamariTitle(today.year(), today.month());
                this.createHeaderDate(today.year(), today.month(), today.date());
                this.createCalendar(this.year, this.month);
            },
            getBeforeMonthDate(year, month) {
                let firstDay = new persianDate([year, month, 1]).toLocale('en').format('d');
                let time = firstDay > 1 ? new persianDate([year, month, 1]).subtract('d', firstDay - 1) : [];
                if (time.length !== 0) {
                    let extraDay = [];
                    let endMonth = new persianDate([time.year(), time.month()]).daysInMonth();
                    let startDayExtra = time.date();
                    for (let counter = startDayExtra; counter <= endMonth; counter++) {
                        let createDay = new persianDate([time.year(), time.month(), counter]);
                        extraDay.push({
                            day: createDay.date(),
                            year: createDay.year(),
                            month: createDay.month(),
                            date: createDay.format("L"),
                            vacationStyle: createDay.format('dddd') === "جمعه",
                            disableStyle: true,
                        });
                    }
                    return extraDay;
                }
                return [];
            },
            getAfterMonthDate(year, month) {
                let minusDay = 35;
                if (this.dayOfCalendar.length > 35)
                    minusDay = 42;
                let afterDay = minusDay - this.dayOfCalendar.length;
                if (afterDay > 0) {
                    let afterMonth = new persianDate([year, month, 1]).add('M', 1).toLocale('fa');
                    let extraDay = [];
                    for (let counter = 1; counter <= afterDay; counter++) {
                        let createDay = new persianDate([afterMonth.year(), afterMonth.month(), counter]);
                        extraDay.push({
                            day: createDay.date(),
                            year: createDay.year(),
                            month: createDay.month(),
                            date: createDay.format("L"),
                            vacationStyle: createDay.format('dddd') === "جمعه",
                            disableStyle: true,
                        });
                    }
                    return extraDay;
                } else return [];
            },
            prevMonth() {
                this.showGoTodayBtn = true;
                let prevMonth = new persianDate([this.year, this.month, 10]).subtract('M', 1);
                this.createMiladiTitle(prevMonth.year(), prevMonth.month());
                this.createQamariTitle(prevMonth.year(), prevMonth.month());
                this.createCalendar(prevMonth.year(), prevMonth.month());
                this.processDate(prevMonth.year(), prevMonth.month());
            }
            ,
            nextMonth() {
                this.showGoTodayBtn = true;
                let nextMonth = new persianDate([this.year, this.month, 10]).add('M', 1);
                this.createMiladiTitle(nextMonth.year(), nextMonth.month());
                this.createQamariTitle(nextMonth.year(), nextMonth.month());
                this.createCalendar(nextMonth.year(), nextMonth.month());
                this.processDate(nextMonth.year(), nextMonth.month());
            },
            processDate(year, month) {
                this.month = month;
                this.year = year;
                let set = new persianDate([this.year, this.month]);
                this.shamsi_title = set.toLocale('fa').format('MMMM') + " " + set.year();
            },
            getDateDetail(year, month, day) {
                this.createHeaderDate(year, month, day);
            },
            shamsi_to_miladi(year, month, day, format = "LL") {
                return new persianDate([year, month, day]).toCalendar('gregorian').toLocale('en').format(format);
            },
            shamsi_to_qamari(year, month, day, format = "iMMMM") {
                let miladi_date = new persianDate([year, month, day]).toCalendar('gregorian').toLocale('en');
                let my = miladi_date.format("YYYY/MM/DD");
                return moment(my).format(format);
            },
        }
    }
</script>

<style>


    .date-table {
        width: 60%;
        padding: 10px;
        position: relative;
        cursor: default;
    }

    .days-head {
        width: 100%;
        height: 40px;
        background-color: #f0f0f0;
        border-radius: 7px;
    }

    .days-head-cell {
        width: 14.28%;
        height: inherit;
        float: right;
        text-align: center;
    }

    .days-head-cell span {
        line-height: 40px;
        font-size: 14px;
        color: #353652;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .day-cell {
        position: relative;
        width: 14.28%;
        padding-top: 9%;
        float: right;
        margin: 5px 0;
    }

    .day-cell-item-inner:hover {
        background: rgba(176, 202, 204, 0.28);
        color: #fff;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        -ms-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .day-cell-item-inner.activeday {
        background: #5b21fa;
        box-shadow: 0 0 0 7px #4117ff30;
    }

    .day-cell-item-inner {
        cursor: pointer;
    }

    .day-cell-item-inner:hover span {
        color: #353652;
    }

    .day-cell-item-inner.activeday span {
        color: #fff;
    }

    .day-cell-inner {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: center;
        -ms-flex-pack: center;
    }

    .day-selected {
        background: #17f1ff;
        box-shadow: 0 0 0 7px #17f1ff30;
    }

    .day-selected span {
        color: #353652 !important;
    }

    .day-cell-item {
        position: relative;
        width: 50%;
        padding-top: 50%;
    }

    .day-cell-item-inner {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: center;
        -ms-flex-pack: center;
        border-radius: 50%;
        color: #9b9b9b;
        -webkit-transition: all 0.4s ease-in-out;
        -moz-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
        -ms-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }

    .day-cell-item-inner span {
        font-size: 18px;
        color: #676666;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .date-table-header {
        margin: 0 0 7px 0;
    }

    .month-last {
        width: 30%;
        height: 40px;
        float: right;
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: flex-end;
        -ms-flex-pack: end;
        cursor: pointer;
        color: #a272a7;
    }

    .month-next {
        width: 30%;
        height: 40px;
        float: right;
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: right;
        -ms-flex-pack: start;
        cursor: pointer;
        color: #a272a7;
    }

    .month-now {
        width: 40%;
        height: 90px;
        float: right;
        display: inline;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: center;
        -ms-flex-pack: center;
        text-align: center;
    }

    .month-now span {
        font-size: 20px;
        color: #343890;
        font-weight: bold;
    }

    .month-next span {
        font-size: 14px;
        color: #a6a6a6;
    }

    .month-next i {
        color: #a6a6a6;
        font-size: 23px;
        margin: 0 0 0 10px;
    }

    .month-last span {
        font-size: 14px;
        color: #a6a6a6;
    }

    .month-last i {
        color: #a6a6a6;
        font-size: 23px;
        margin: 0 10px 0 0;
    }

    .dd-calendar {
        position: relative;
        background-color: #fbfaff;
        padding: 10PX;
        width: 40%;
    }

    .calendar-in-span {
        cursor: default;
        font-size: 58px;
        color: #00a651;
    }

    .calendar-in-span span {
        font-size: 20px;
        color: #00a651;
        position: relative;
        top: -4px;
    }

    .calendar-btn {
        background-color: #ff4552;
        width: 95%;
        height: 45px;
        border-radius: 10px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 0 !important;
        display: block;
        justify-content: end;
        position: absolute;
        margin-top: 5;
        bottom: 10px;
        left: 10px;
    }
    .calendar-btn i{
        padding: 0 5px;
    }

    .list-class-date li {
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        padding: 6px;
        margin-bottom: 15px;
        transition: 0.5s;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -ms-transition: 0.5s;
        -o-transition: 0.5s;
    }

    .list-class-date li:hover {
        box-shadow: 0px 0px 38px 0px rgba(25, 25, 25, 0.1);
    }

    .list-class-date-s1 {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 0;
    }

    .list-class-date-s1 i {
        margin-left: 5px;
    }

    .list-class-time, .list-class-time span {
        color: #ffac5f;
        font-size: 14px;
    }

    .list-class-time-s1 {
        margin-right: 3px;
    }

    .list-class-time-s2 {
        margin-left: 3px;
    }

    .list-class-time i {
        margin-right: 7px;
        color: #bcbcbc;
        font-size: 20px;
        position: relative;
        top: -1px;
    }

    .new-class {
        color: #c6c6c6;
        font-size: 12px;
        margin-top: 35px;
    }

    .new-class i {
        margin-left: 6px;
    }

    .early-times {
        margin-top: 20px;
    }

    .early-times-in {
        width: 70%;
    }

    .early-times-in-ul {
        padding: 0 20px;
    }

    .early-times-in-ul li {
        margin-bottom: 15px;
    }

    .early-times-in-ul li a {
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 5px 0px rgba(25, 25, 25, 0.15);
        padding: 8px;
    }

    .early-times-in-ul li a:hover {
        box-shadow: 0px 0px 38px 0px rgba(25, 25, 25, 0.1);
    }

    .early-times-in-ul li a h2 {
        font-size: 14px;
        color: #767070;
        margin-bottom: 0;
    }

    .early-times-in-ul li a i {
        color: #c0c0c0;
        transition: 0.5s;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -ms-transition: 0.5s;
        -o-transition: 0.5s;
    }

    .early-times-in-ul li a:hover i {
        color: #ff8080;
        margin-left: 10px;
    }

    .early-times-in-ul-date {
        color: #ff8080;
        font-size: 14px;
    }

    .early-times-in-ul-time {
        color: #ffac5f;
        font-size: 14px;
    }

    .early-times-in .new-class {
        margin-top: 5px;
    }

    .Rounded_baner {
        border-radius: 10px;
        background-color: rgb(52, 56, 144);
        box-shadow: 0px 0px 5px 0px rgba(25, 25, 25, 0.15);
        width: 100%;
        height: auto;
        margin: 30px 0;
    }

    .btn-again {
        border-radius: 10px;
        background-color: rgb(255, 172, 95);
        height: 55px;
        color: #fff;
        width: 90%;
        margin: 0 auto;
        margin-bottom: 10px;
    }

    .btn-again:hover {
        color: #fff;
    }

    .disableStyle {
        color: #b3b0b0 !important;
    }

    .vacationStyle {
        color: red !important;
    }

    .day_selected {
        background: rgba(176, 202, 204, 0.38);
    }

    .calendar-in-span {
        font-size: 20px;
    }

    .list-class-date {
        margin-top: 20px;
    }

    .qamari.small {
        font-family: iransans_light;
        font-size: 13px;
    }

    .miladi {
        font-family: Tahoma, serif;
    }

    .miladi.small {
        font-size: 11px;
    }

    .small_header {
        font-size: 13px;
        text-align: center;
        font-weight: bold;
    }

    .miladi_in_table {
        font-family: SansSerif,Arial !important;
        font-size: 15px !important;
        color: #222 !important;
        letter-spacing: 0 !important;
        font-weight: normal !important;
        white-space: nowrap;
    }

    .qamari_in_table {
        font-size: 14px !important;
        letter-spacing: 0 !important;
        color: #949494 !important;
        white-space: nowrap;

    }

    .go_today {
        display: block;
        position: absolute;
        bottom: 20px;
        right: 10px;
    }

    .go_today button {
        text-align: center;
        background-color: #ff4552;
        display: block;
        color: white;
    }

    @media only screen and (max-width: 1200px) {
        .calendar-in-span {
            font-size: 15px;
        }

        .small_header {
            font-size: 13px;
        }

        .miladi_in_table {
            font-size: 15px !important;
        }
        .qamari_in_table { font-size: 12px !important;}
    }

    /* dashboard */
</style>
