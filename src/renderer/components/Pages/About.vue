<template>
  <div id="wrapper">
    <div class="dashboard">
      <div class="page">
        <div class="head">
          <span class="d-block h5 pr-2 pt-2">درباره</span>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="tools pb-3 pt-3">
        <div>
          <p>
            سلام به همگی ، من <a href="#" @click="open('https://rezaghz.com')"><em>رضا قاسم زاده</em></a> هستم ، در سال هایی که با سیستم عامل های مختلف کار میکردم ، تقویم یا دستیار
            فارسی یکپارچه ای رو ندیدم که اوپن سورس باشه و بتونه توی سیستم عامل های مختلف کار کنه و دائما هم در حال آپدیت باشه
            بنابراین تصمیم گرفتم که یک نرم افزاری رو طراحی کنم که تمام این ویژگی ها رو داشته باشه ، بنابراین از سال 99
            تصمیم به ساخت و توسعه لوتوس کردم و هر از چندگاهی اون رو در زمان های بیکاریم توسعه میدادم.
          </p>
          <br>
          <p>
            و در نهایت تصمیم گرفتم که در سال 1400 لوتوس رو در گیت هاب منتشر کنم.
          </p>
          <br>
          <p>
            <b>لوتوس ؛ مجموعه ای از تلاش تمامی مشارکت کنندگان در جامعه متن باز ایران ، اگر شما هم دوست داشتید به جمع ما
              اضافه بشید </b>
          </p>
          <br>
        </div>
        <div class="d-flex justify-content-center align-items-center pt-2">
          <a href="#" @click="open('https://github.com/rezaghz/loutos')" class="display-4"><i class="fa fa-github-square"></i></a>
        </div>
      </div>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from '../Partials/Sidebar';

export default {
  name: "setting",
  components: {
    Sidebar
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
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
  cursor:default;
}
</style>