<template>
  <div id="sidebar">
    <div id="btn">
      <div id='top'></div>
      <div id='middle'></div>
      <div id='bottom'></div>
    </div>
    <div id="box">
      <div id="items">
        <router-link to="/">
          <div class="item"><i class="fa fa-calendar"></i> تقویم</div>
        </router-link>
        <router-link to="/notes">
          <div class="item"><i class="fa fa-sticky-note"></i> دفترچه یادداشت</div>
        </router-link>
        <router-link to="/convert-dates">
          <div class="item"><i class="fa fa-exchange"></i> تبدیل تاریخ</div>
        </router-link>
        <router-link to="/settings">
          <div class="item"><i class="fa fa-cog"></i> تنظیمات</div>
        </router-link>
        <router-link to="/about">
          <div class="item"><i class="fa fa-question-circle"></i> درباره</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

window.onload = function () {


}
export default {
  name: "sidebar",
  mounted() {
    const sidebarBox = document.querySelector('#box'),
        sidebarBtn = document.querySelector('#btn');
    sidebarBtn.addEventListener('click', event => {
      sidebarBtn.classList.toggle('active');
      sidebarBox.classList.toggle('active');
      if (sidebarBox.style.display === "" || sidebarBox.style.display === "none")
        sidebarBox.style.display = "block";
      else
        sidebarBox.style.display = "none";
    });
    window.addEventListener('keydown', event => {
      if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
        sidebarBtn.classList.remove('active');
        sidebarBox.classList.remove('active');
        if (sidebarBox.style.display === "" || sidebarBox.style.display === "none")
          sidebarBox.style.display = "block";
        else
          sidebarBox.style.display = "none";
      }
    });
  },
  methods: {}
}
</script>

<style scoped>
#btn {
  position: fixed;
  z-index: 5;
  top: 23px;
  right: 23px;
  cursor: pointer;
  transition: right 200ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
}

#btn div {
  width: 35px;
  height: 2px;
  margin-bottom: 8px;
  background-color: #000000;
  transition: transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91), opacity 500ms, background-color 250ms;
}

#btn.active {
  right: 230px;
}

#btn.active div {
  background-color: #343838;
}

#btn.active #top {
  transform: translateY(10px) rotate(-135deg);
}

#btn.active #middle {
  opacity: 0;
  transform: rotate(135deg);
}

#btn.active #bottom {
  transform: translateY(-10px) rotate(-45deg);
}

#box {
  position: fixed;
  z-index: 4;
  overflow: auto;
  display: none;
  top: 0;
  right: 0;
  width: 275px;
  opacity: 0;
  padding: 20px 0px;
  height: 100%;
  background-color: #f6f6f6;
  color: #343838;
  transition: all 350ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
}

#box.active {
  left: 0px;
  opacity: 1;
}

#items {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#items i {
  padding: 0 5px;
}

#items .item {
  position: relative;
  cursor: pointer;
  font-size: 1.2em;
  padding: 15px 30px;
  transition: all 250ms;
}

#items .item:hover {
  padding: 15px 45px;
  background-color: rgba(52, 56, 56, 0.2);
}

#btn, #btn * {
  will-change: transform;
}

#box {
  will-change: transform, opacity;
}

</style>