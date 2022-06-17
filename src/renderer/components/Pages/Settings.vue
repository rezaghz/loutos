<template>
  <div id="wrapper">
    <div class="dashboard">
      <div class="page">
        <div class="head">
          <span class="d-block h5 pr-2 pt-2">تنظیمات</span>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="tools pb-3 pt-3">
        <div class="col-6">
          <div class="mb-3 form-check">
            <input @change="changeSetting('run_startup')" type="checkbox" class="form-check-input" id="run_startup"
                   v-model="run_startup">
            <label class="form-check-label" for="run_startup"> باز شدن برنامه در شروع سیستم عامل
            </label>
          </div>
          <div class="mb-3 form-check">
            <input @change="changeSetting('active_close_button')" type="checkbox" class="form-check-input"
                   id="active_close_button" v-model="active_close_button">
            <label class="form-check-label" for="active_close_button">بسته شدن برنامه با کلیک روی Close
            </label>
          </div>
          <div class="mb-3 form-check">
            <input @change="changeSetting('tray_after_minimize')" type="checkbox" class="form-check-input"
                   id="tray_after_minimize" v-model="tray_after_minimize">
            <label class="form-check-label" for="tray_after_minimize">Tray شدن برنامه با کلیک روی Minimize
            </label>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from '../Partials/Sidebar';

export default {
  name: "settings",
  components: {
    Sidebar
  },
  data() {
    return {
      active_close_button: false,
      tray_after_minimize: true,
      run_startup: false,
    }
  },
  mounted() {
    let data = Object.entries(this.$data);
    data.forEach((item) => {
      let localStorageItem = localStorage.getItem('settings.' + item[0])
      if (localStorageItem !== null) {
        this.$data[item[0]] = localStorageItem === 'true';
      } else {
        localStorage.setItem('settings.' + item[0], this.$data[item[0]].toString());
      }
    });
  },
  methods: {
    changeSetting(variable) {
      localStorage.setItem('settings.' + variable, this.$data[variable].toString());
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
  background-color: #ff4552;
}

</style>