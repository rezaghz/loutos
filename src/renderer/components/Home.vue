<template>
    <div id="wrapper">
        <div class="dashboard d-flex">
            <div class="date-table">
                <div class="date-table-header">
                    <div class="month-next" @click="prevMonth()">
                        <i class="fa fa-angle-right"></i>
                        <span>ماه قبل</span>
                    </div>
                    <div class="month-now">
                        <span>{{shamsi_title}}</span>
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
                    <div class="day-cell" @click="getDateDetail(value.year,value.month,value.day)"
                         v-for="value in dayOfCalender">
                        <div class="day-cell-inner">
                            <div class="day-cell-item">
                                <div class="day-cell-item-inner" :class="[{day_selected : value.disableSelected}]">
                                    <span :class="{disableStyle : value.disableStyle,vacationStyle : value.vacationStyle}">
{{value.shamsi_day}}
                                    </span>
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
                <div class="d-flex align-items-center justify-content-between dd-calendar-in">
                    <div class="calendar-in">
                        <span class="calendar-in-span">{{boldDate.day}} <span>{{boldDate.year}}</span></span>
                    </div>
                    <div class="calendar-btn d-flex justify-content-center align-items-center">
                        کلاس دارید
                    </div>
                </div>
                <ul class="list-class-date">
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
                    </li>
                    <li>
                        <a href="#" target="_blank" class="d-flex justify-content-between align-items-center">
                            <h2 class="IRANSans-Light list-class-date-s1 d-flex align-items-center"><i
                                    class="fa fa-video-camera"></i> لورم ایپسوم متن ساختگی </h2>
                            <div class="list-class-time d-flex align-items-center"><span class="list-class-time-s1">18:00</span>-<span
                                    class="list-class-time-s2">15:00</span> <i class="fa fa-angle-left"></i></div>
                        </a>
                    </li>
                </ul>
                <a href="#" class="new-class d-flex align-items-center justify-content-center transition-5">
                    <i class="fa fa-video-camera"></i> شرکت در کلاس جدید
                </a>
            </div>
        </div>
        <copyright></copyright>

    </div>
</template>

<script>
    import Copyright from './Partials/Copyright';

    export default {
        name: 'home',
        components: {Copyright},
        data() {
            return {
                shamsi_title: "",
                month: "",
                year: "",
                day: "",
                dayOfCalender: [],
                disableSelected: false,
                calenderCourse: [],
                boldDate: {
                    date: "",
                    year: ""
                }
            }
        },
        mounted() {
            let today = new persianDate();
            this.year = today.year();
            this.month = today.month();
            this.day = today.date();
            this.shamsi_title = today.toLocale('fa').format('MMMM') + " " + this.year;
            this.boldDate = {
                day: today.format("D") + " " + today.toLocale('fa').format('MMMM'),
                year: today.year(),
            }
            this.createCalender(this.year, this.month);
        },

        methods: {
            createCalender(year, month) {
                let dayInMonth = new persianDate([year, month]).daysInMonth();
                let beforeMonthDate = this.getBeforeMonthDate(year, month);
                let self = this;
                this.dayOfCalender = [];
                // Before Deselected Month
                if (beforeMonthDate.length > 0) {
                    beforeMonthDate.forEach(function (time) {
                        self.dayOfCalender.push({
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
                    self.dayOfCalender.push({
                        shamsi_day: createDay.date(),
                        miladi_day: this.shamsi_to_miladi(createDay.year(), createDay.month(), createDay.date(), "DD"),
                        qamari_day: this.shamsi_to_qamari(createDay.year(), createDay.month(), createDay.date(), "iDD"),
                        year: createDay.year(),
                        month: createDay.month(),
                        date: createDay.format("L"),
                        disableSelected: self.disableSelected,
                        vacationStyle: createDay.format('dddd') === "جمعه",
                    });
                    self.disableSelected = false;
                }
                let afterMonthDate = this.getAfterMonthDate(year, month);
                if (afterMonthDate.length > 0) {
                    afterMonthDate.forEach(function (time) {
                        self.dayOfCalender.push({
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
                console.log(this.dayOfCalender);
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
                if (this.dayOfCalender.length > 35)
                    minusDay = 42;
                let afterDay = minusDay - this.dayOfCalender.length;
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
                //showLoading();
                let prevMonth = new persianDate([this.year, this.month, 10]).subtract('M', 1);
                this.createCalender(prevMonth.year(), prevMonth.month());
                this.processDate(prevMonth.year(), prevMonth.month());
                // hideLoading();
            }
            ,
            nextMonth() {
                // showLoading();
                let nextMonth = new persianDate([this.year, this.month, 10]).add('M', 1);
                this.createCalender(nextMonth.year(), nextMonth.month());
                this.processDate(nextMonth.year(), nextMonth.month());
                //hideLoading();
            },
            processDate(year, month) {
                this.month = month;
                this.year = year;
                let set = new persianDate([this.year, this.month]);
                this.shamsi_title = set.toLocale('fa').format('MMMM') + " " + set.year();
            },
            getDateDetail(year, month, day) {
                let date = new persianDate([year, month, day]);
                console.log(year);
                this.boldDate = {
                    day: date.format("D") + " " + date.toLocale('fa').format('MMMM'),
                    year: year,
                }
            },
            open(link) {
                this.$electron.shell.openExternal(link)
            },
            shamsi_to_miladi(year, month, day, format = "LL") {
                return new persianDate([year, month, day]).toCalendar('gregorian').toLocale('en').format(format);
            },
            shamsi_to_qamari(year, month, day, format = "iMMMM") {
                let miladi_date = new persianDate([year, month, day]).toCalendar('gregorian').toLocale('en');
                let my = miladi_date.format("YYYY/MM/DD");
                return moment(my).subtract("days",1).format(format);
            }
        }
    }
</script>

<style>
    /* dashboard */

    .dashboard {
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 5px 0px rgba(25, 25, 25, 0.15);
        background-color: #fff;
    }

    .clear {
        clear: both;
    }

    .date-table {
        width: 60%;
        padding: 10px;
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
        background: #17f1ff;
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
        height: 40px;
        float: right;
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: center;
        -ms-flex-pack: center;
    }

    .month-now span {
        font-size: 18px;
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
        background-color: #fbfaff;
        padding: 10PX;
        width: 40%;
    }

    .calendar-in-span {
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
        width: 136px;
        height: 45px;
        border-radius: 10px;
        font-size: 16px;
        color: #fff;
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
        background: #17f1ff;
        box-shadow: 0 0 0 7px #17f1ff30;
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

    .miladi.small {
        font-family: Tahoma, serif;
        font-size: 11px;
    }


    /* dashboard */
</style>
