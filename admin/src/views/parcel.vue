<template>
  <v-data-table
    v-model="selected"
    :headers="headers.filter(show)"
    :items="desserts"
    item-key="id"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>คลังพัสดุลูกบ้าน</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-divider class="mx-4" inset vertical v-if="selected.length>0" />
        <v-btn
          v-if="selected.length>0"
          color="primary"
          dark
          class="mb-2"
          v-on="on"
          @click="printpdf"
        >Print</v-btn>
        <v-divider v-if="selected.length>0" class="mx-4" inset vertical />
        <v-dialog v-model="dialog" max-width="750px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid fill-height>
                <v-layout child-flex>
                  <v-row>
                    <v-col sm="7" md="2">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.pno"
                        label="เลขที่พัสดุ"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="3">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.ref"
                        label="รหัสรับเอกสาร"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="4">
                      <v-dialog
                        ref="datedialog"
                        v-model="datemodal"
                        :return-value.sync="editedItem.pdatein"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.pdatein"
                            :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                            label="วันที่รับพัสดุ"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.pdatein" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="datemodal = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.datedialog.save(editedItem.pdatein)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col sm="7" md="3">
                      <v-select :items="status_list" v-model="editedItem.status" label="สถานะ"></v-select>
                    </v-col>
                    <v-col sm="7" md="3">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.pres"
                        label="ผู้รับ"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="6">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.address"
                        label="ที่อยู่"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="2">
                      <v-select
                        :items="['D1','D2']"
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.build"
                        label="อาคาร"
                      ></v-select>
                    </v-col>
                    <v-col sm="7" md="1">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.room"
                        label="ห้อง"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="2">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.ptype"
                        label="ประเภทพัสดุ"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="2">
                      <v-text-field
                        :disabled="editedItem.status=='ส่งแล้ว'||editedItem.status=='ตีคืน'"
                        v-model="editedItem.size"
                        label="ขนาด"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="7" md="4">
                      <v-text-field disabled v-model="editedItem.pdateout" label="วันที่ส่งมอบ"></v-text-field>
                    </v-col>
                    <v-col sm="7" md="4">
                      <v-text-field v-model="editedItem.comment" label="หมายเหตุ"></v-text-field>
                    </v-col>
                  </v-row>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn :disabled="editedItem.status==1" color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="xeditItem(item)">mdi-tooltip-edit</v-icon>
      <span v-if="item.status=='รับเข้า'">|</span>
      <span></span>
      <v-icon v-if="item.status=='รับเข้า'" small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
const storage = window.localStorage;
import xdecode from "vue-jwt-decode";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew BoldItalic.ttf"
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
};
export default {
  data() {
    return {
      role: "admin",
      xtoken: storage.getItem("token"),
      selected: [],
      dialog: false,
      datedialog: false,
      datemodal: false,
      status_list: ["รับเข้า", "แจ้งลูกบ้าน", "ส่งแล้ว", "ตีคืน"],
      pheader: [
        { text: "เลขที่พัสดุ", alignment: "center" },
        { text: "ผู้รับ", alignment: "center" },
        { text: "อาคาร", alignment: "center" },
        { text: "ห้อง", alignment: "center" },
        { text: "ประเภทพัสดุ", alignment: "center" },
        { text: "ขนาด", alignment: "center" },
        { text: "หมายเหตุ", alignment: "center" }
      ],
      headers: [
        {
          text: "เลขที่พัสดุ",
          align: "left",
          sortable: true,
          value: "pno",
          enable: true
        },
        {
          text: "ผู้รับ",
          align: "left",
          sortable: true,
          value: "pres",
          enable: true
        },
        {
          text: "อาคาร",
          align: "left",
          sortable: true,
          value: "build",
          enable: true
        },
        {
          text: "ห้อง",
          align: "left",
          sortable: true,
          value: "room",
          enable: true
        },
        {
          text: "บ้านเลขที่",
          align: "left",
          sortable: false,
          value: "address",
          enable: false
        },
        {
          text: "ประเภทพัสดุ",
          align: "left",
          sortable: false,
          value: "ptype",
          enable: true
        },
        {
          text: "ขนาดพัสดุ",
          align: "left",
          sortable: false,
          value: "size",
          enable: false
        },
        {
          text: "รหัสรับเอกสาร",
          align: "left",
          sortable: false,
          value: "ref",
          enable: true
        },
        {
          text: "วันที่รับ",
          align: "left",
          sortable: true,
          value: "pdatein",
          enable: true
        },
        {
          text: "วันที่ ",
          align: "left",
          sortable: false,
          value: "pdateout",
          enable: false
        },
        {
          text: "สถานะ",
          align: "left",
          sortable: true,
          value: "status",
          enable: true
        },
        {
          text: "หมายเหตุ",
          align: "left",
          sortable: false,
          value: "comment",
          enable: false
        },
        {
          text: "Actions",
          value: "action",
          align: "right",
          sortable: false,
          enable: true
        }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        pno: "",
        pres: "",
        build: "",
        room: "",
        address: "",
        ptype: "",
        size: "",
        ref: "",
        pdatein: new Date().toISOString().substr(0, 10),
        pdateout: "",
        status: "",
        comment: ""
      },
      defaultItem: {
        pno: "",
        pres: "",
        build: "",
        room: "",
        address: "",
        ptype: "",
        size: "",
        ref: "",
        pdatein: new Date().toISOString().substr(0, 10),
        pdateout: "",
        status: "",
        comment: ""
      }
    };
  },
  created() {
    //console.log(this.xtoken)
    if (this.xtoken) {
      axios.defaults.headers.common["authorization"] = `Bearer ${this.xtoken}`;
      //console.log(xdecode.decode(this.xtoken).sub)
      axios
        .get("/api/users/" + xdecode.decode(this.xtoken).sub)
        .then(response => this.checkrole(response.data.role))
        .catch(error => this.logout(error));
    } else {
      delete axios.defaults.headers.common["authorization"];
      this.$router.replace({ name: "login", params: { page: "parcel" } });
    }
  },
  methods: {
    printpdf() {
      var docDefinition = {
        content: [],
        defaultStyle: {
          font: "THSarabunNew"
        }
      };
      let xprint = this.selected;
      for (let count = 0; count < xprint.length; count++) {
        let docstmp = {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["*"],
            body: [
              [
                {
                  text:
                    "โปรดรับเอกสาร ภายใน 15 วัน นับจากวันที่แจ้ง หากพ้นกำหนด จะดำเนินการส่งคืนไปรณีย์",
                  alignment: "center"
                }
              ],
              [
                {
                  table: {
                    widths: [50, "*", 25, 20, 50, 50, "*"],
                    body: [
                      [
                        { text: "เลขที่พัสดุ", alignment: "center" },
                        { text: "ผู้รับ", alignment: "center" },
                        { text: "อาคาร", alignment: "center" },
                        { text: "ห้อง", alignment: "center" },
                        { text: "ประเภทพัสดุ", alignment: "center" },
                        { text: "ขนาด", alignment: "center" },
                        { text: "หมายเหตุ", alignment: "center" }
                      ],
                      [
                        xprint[count].pno,
                        xprint[count].pres,
                        xprint[count].build,
                        xprint[count].room,
                        xprint[count].ptype,
                        xprint[count].size,
                        xprint[count].comment || null
                      ]
                    ]
                  }
                }
              ]
            ]
          },
          layout: "headerLineOnly"
        }
        ;
        docDefinition.content.push(docstmp);
        docDefinition.content.push({text: ' '});
      }

      pdfMake.createPdf(docDefinition).open();
    },
    logout() {
      delete axios.defaults.headers.common["authorization"];
      this.$router.replace({
        name: "login",
        params: {
          page: "parcel",
          error: "Section Expire"
        }
      });
    },
    checkrole(role) {
      if (role == this.role) {
        this.initialize();
      } else {
        delete axios.defaults.headers.common["authorization"];
        this.$router.replace({
          name: "login",
          params: {
            page: "parcel",
            error: "This user can not access this function"
          }
        });
      }
    },
    show(element) {
      return element.enable;
    },
    initialize() {
      axios
        .get("/api/parcel")
        .then(response => (this.desserts = response.data));
    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    save() {
      let xurl = "/api/parcel/" + this.editedItem.id;
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        if (
          this.editedItem.status == "ส่งแล้ว" ||
          this.editedItem.status == "ตีคืน"
        ) {
          this.editedItem.pdateout = new Date().toISOString().substr(0, 10);
          this.desserts[
            this.editedItem.id - 1
          ].pdateout = this.editedItem.pdateout;
        }
        //console.log(this.editedItem)
        axios.put(xurl, this.editedItem);
        axios
          .get("/api/parcel")
          .then(response => (this.desserts = response.data));
      } else {
        this.desserts.push(this.editedItem);
        axios.post("/api/parcel", this.editedItem);
        if (
          this.editedItem.status == "ส่งแล้ว" ||
          this.editedItem.status == "ตีคืน"
        ) {
          this.editedItem.pdateout = new Date().toISOString().substr(0, 10);
          this.desserts[
            this.editedItem.id - 1
          ].pdateout = this.editedItem.pdateout;
        }
        axios
          .get("/api/parcel")
          .then(response => (this.desserts = response.data));
      }
      this.close();
    },
    xeditItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    xdelete(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
      axios.delete("/api/parcel/" + item.id);
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.xdelete(item);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มพัสดุ" : "Edit";
    }
  }
};
</script>