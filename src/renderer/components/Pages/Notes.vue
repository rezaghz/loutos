<template>
  <div id="wrapper">
    <div class="dashboard d-flex">
      <div class="list">
        <div class="head">
          <span class="d-block h5 pr-2 pt-2">لیست یادداشت ها</span>
        </div>
        <div class="body pt-2">
          <div class="item d-flex flex-column justify-content-between pb-1 "
               v-for="(note,index) in notes"
               :style="{backgroundColor : note.color}" @click="show(note.id,index)">
            <div class="title">
              <span>{{ note.title }}</span>
            </div>
            <div class="tools d-flex flex-row justify-content-between p-1 align-items-center">
              <p class="m-0"> {{ note.short_description }}</p>
              <span @click.prevent="destroy(note.id,index)"><i class="fa fa-trash"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="new" :style="{backgroundColor : background_color_new_body}">
        <div id="input_new_title">
          <input type="text" class="form-control"
                 v-model="title" placeholder="عنوان ..." dir="rtl">
        </div>
        <div id="input_new_body">
                    <textarea class="form-control" rows="20"
                              v-model="description"
                              id="body_textarea" dir="rtl"
                              placeholder="متن یادداشت ..."></textarea>
        </div>

        <span v-if="mode === 'add'" class="btn_circle_process" @click="add()"><i class="fa fa-plus"></i></span>
        <span v-else @click="update()" class="btn_circle_process"><i class="fa fa-check"></i></span>
        <span v-if="mode !== 'add'" @click="refresh()" class="btn_circle_process" id="new_note"><i
            class="fa fa-plus-circle"></i></span>
        <div class="tools d-flex flex-row align-items-baseline position-absolute">
          <div class="set_color_body d-flex flex-column-reverse">
            <span @click="show_color_list = !show_color_list"><i class="fa fa-paint-brush"></i></span>
            <transition-group name="fade" tag="div">
              <div class="color_list" v-if="show_color_list" :key="1">
                            <span v-for="(color,index) in color_list" :class="{selected : color.selected}" :key="index"
                                  @click="selectColor(index)" :style="{backgroundColor : color.color}"></span>
              </div>
            </transition-group>
          </div>
          <!--                    <span><i class="fa fa-image"></i></span>-->
        </div>
      </div>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from '../Partials/Sidebar';

let PouchDB = require('pouchdb').default;
let eventsDb = new PouchDB('notes');
export default {
  name: "notes",
  components: {
    Sidebar
  },
  data() {
    return {
      mode: "add",
      title: "",
      description: "",
      show_color_list: false,
      background_color_new_body: "white",
      current_index: null,
      current_id: null,
      color_list: [
        {
          color: "#f7d794",
          selected: false,
        },
        {
          color: "#778beb",
          selected: false,
        },
        {
          color: "#ea8685",
          selected: false,
        },
        {
          color: "#f3a683",
          selected: false,
        },
        {
          color: "#3dc1d3",
          selected: false,
        },
        {
          color: "white",
          selected: true,
        },
      ],
      notes: [],
    }
  },
  mounted() {
    let self = this;
    db.info().then(function (result) {
      console.warn("connected successfully");
    }).catch(function (err) {
      console.log(err);
    });
    // remove all notes
    /*eventsDb.allDocs().then(function (result) {
        return Promise.all(result.rows.map(function (row) {
            return eventsDb.remove(row.id, row.value.rev);
        }));
    }).then(function () {
        // done!
    }).catch(function (err) {
        // error!
    });*/
    db.allDocs({include_docs: true, descending: false}, function (err, doc) {
      doc.rows.forEach(val => {
        let doc = val.doc;
        self.notes.push({
          id: doc._id,
          title: doc.title,
          color: doc.color,
          description: doc.description,
          short_description: self.strLimit(doc.description),
        });
      });
    });
  },
  methods: {
    refresh() {
      let self = this;
      self.mode = 'add';
      self.title = "";
      self.description = ""
      self.background_color_new_body = "white";
    },
    add() {
      let self = this;
      if (this.title.length > 0 || this.description.length > 0) {
        db.post({
          title: this.title,
          description: this.description,
          color: this.background_color_new_body,
        }).then(function (response) {
          console.log(response);
          self.notes.unshift({
            id: response.id,
            title: self.title,
            color: self.background_color_new_body,
            description: self.description,
            short_description: self.strLimit(self.description)
          });
          self.title = "";
          self.description = "";
        }, self).catch(function (err) {
          console.log(err);
        });
      }
    },
    show(id, index) {
      let self = this;
      self.mode = "edit";
      self.current_id = id;
      self.current_index = index;
      db.get(id).then(function (doc) {
        self.title = doc.title;
        self.description = doc.description;
        self.background_color_new_body = doc.color;
      }).catch(function (err) {
        console.log(err);
      });
    },
    update() {
      let self = this;
      db.get(self.current_id).then(function (doc) {
        return db.put({
          _id: self.current_id,
          _rev: doc._rev,
          title: self.title,
          description: self.description,
          color: self.background_color_new_body,
        });
      }, self).then(function (response) {
        self.notes[self.current_index].title = self.title;
        self.notes[self.current_index].description = self.description;
        self.notes[self.current_index].short_description = self.strLimit(self.description);
        self.notes[self.current_index].color = self.background_color_new_body;
        swal("یادداشت با موفقیت ویرایش شد", {
          icon: "success",
          button: "باشه",
        });
      }).catch(function (err) {
        console.log(err);
      });
    },
    destroy(id, index) {
      let self = this;
      swal({
        title: "مطمئنی ؟",
        text: "یادداشتت رو میخوای پاکش کنی ؟",
        icon: "warning",
        buttons: ["نه !", " آره !"],
        dangerMode: true,
      })
          .then((willDelete) => {
            if (willDelete) {
              db.get(id).then(function (doc) {
                return db.remove(doc);
              }).then(function (result) {
                swal("یادداشت با موفقیت پاک شد", {
                  icon: "success",
                  button: "باشه"
                });
                self.mode = 'add';
                self.notes.splice(index, 1);
                self.title = "";
                self.description = "";
                self.background_color_new_body = "white";
              }).catch(function (err) {
                console.log(err);
              });
            }
          });
    },
    selectColor(index) {
      for (let i in this.color_list) {
        this.color_list[i].selected = false;
      }
      this.color_list[index].selected = true;
      this.background_color_new_body = this.color_list[index].color;
    },
    strLimit(str, end = 30) {
      return str.length < 30 ? str : str.substring(0, end) + " ...";
    }
  }
}
</script>

<style scoped>
.list {
  width: 45%;
  padding: 10px;
  position: relative;
  cursor: default;
  border-left: 1px solid #f0f0f0;
}

.new {
  width: 55%;
  position: relative;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.head {
  width: 100%;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 7px;
}

.body {
  height: 600px;
  overflow-y: scroll;
}

.body .item {
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  background: #fff;
  border-radius: 10px;
  display: inline-block;
  height: 110px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 15px 15px 25px 15px;
  padding: 12px;
  cursor: pointer;
}

.body .item:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.body .item:active {
  height: 107px;
}


.place_holder_color::placeholder {
  color: #ffffff !important;
}


#input_new_title {
  margin-top: 5px;
  border-bottom: 2px solid #f0f0f0;
}

#input_new_title input {
  border: none !important;
  display: block;
  background-color: transparent;
}

#input_new_title input::placeholder {
  color: #000000;
}


#input_new_body {
  height: 600px;
}

#body_textarea {
  border: none;
  resize: none;
  outline: none;
  display: block;
  padding-top: 10px;
  padding-right: 10px;
  height: 100%;
  padding-bottom: 50px;
  background-color: transparent;
}

#body_textarea::placeholder {
  color: #000000;
}

.btn_circle_process {
  height: 50px;
  width: 50px;
  background-color: #ff4552;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 20px;
  bottom: 20px;
  cursor: pointer;
}

.btn_circle_process i {
  margin: auto;
  color: white;
}

#new_note {
  left: 80px;
  background-color: #ff9645;
}

.tools {
  right: 20px;
  bottom: 20px;
}

.tools span {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
}

.tools span i {
  margin: auto;
  color: black;
}

.tools span:hover {
  background-color: rgba(143, 136, 136, 0.36);
}

.color_list {
  background-color: #e9e9e9;
  border-radius: 40px;
  width: 75%;
  margin-bottom: 5px;
  padding: 1px 0;
}

.color_list span {
  height: 35px;
  width: 35px;
  margin: 10px auto;
  cursor: pointer;
}

.color_list .selected {
  border: 4px solid #6d6e71;
}

@media only screen and (max-width: 1600px) {
  .body, #input_new_body {
    height: 500px !important;
  }
}

@media only screen and (max-width: 1400px) {
  .body, #input_new_body {
    height: 500px !important;
  }
}

@media only screen and (max-width: 1200px) {
  .body, #input_new_body {
    height: 400px !important;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}


</style>