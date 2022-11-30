<template>
  <div id="wrapper" class="notes">
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
    eventsDb.info().then(function (result) {
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
    eventsDb.allDocs({include_docs: true, descending: false}, function (err, doc) {
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
        eventsDb.post({
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
      eventsDb.get(id).then(function (doc) {
        self.title = doc.title;
        self.description = doc.description;
        self.background_color_new_body = doc.color;
      }).catch(function (err) {
        console.log(err);
      });
    },
    update() {
      let self = this;
      eventsDb.get(self.current_id).then(function (doc) {
        return eventsDb.put({
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
              eventsDb.get(id).then(function (doc) {
                return eventsDb.remove(doc);
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


</style>