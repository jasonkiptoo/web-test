<template>
  <v-container>
    <v-card
      variant="outline"
      elevation="0"
      class="d-flex mx-auto justify-center"
      width="250"
      height="250"
    >
      <v-icon
        @click="scan"
        v-if="!startScan"
        size="250"
        color="grey"
        aria-hidden="true"
      >
        mdi-qrcode-scan
      </v-icon>
      <qrcode-stream
        v-if="startScan"
        width="100"
        height="100"
        @detect="onDetect"
      ></qrcode-stream>
    </v-card>

    <v-card-text>
      <v-text-field
        v-model="urLink"
        :loading="loading"
        append-inner-icon="mdi-content-copy"
        density="compact"
        label=""
        variant="outlined"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
    {{ sendError }}

    <!-- <v-card variant="outlined" class="mx-auto" max-width="344" elevation="0">
        <v-card-item>
          <v-card-title>
            Card title
          </v-card-title>
  
          <v-card-subtitle>
            Card subtitle secondary text
          </v-card-subtitle>
        </v-card-item>
  
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>
      </v-card>
   -->
    <v-row>
      <v-col class="ma-8 d-flex mx-auto justify-space-evenly">
        <v-btn color="primary" @click="scan" variant="outlined"> Scan </v-btn>
        <v-btn color="primary" @click="save" variant="outlined"> Save me  </v-btn>
      </v-col>
    </v-row>

    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          URL
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in urls"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.url }}</td>
      </tr>
    </tbody>
  </v-table>

  <v-row>
      <v-col class="ma-8 d-flex mx-auto justify-space-evenly">
        <v-btn color="primary" @click="getDownload()" variant="outlined"> Download </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { getData } from '../services/httpService.js';

const startScan = ref(false);
const urLink = ref("");
const sendError=ref(null)


const urls = ref([]);

const onDetect = (value) => {
  urLink.value = value[0].rawValue
  sendError.value = value
};

const scan = () => {
  startScan.value = !startScan.value;
  // Perform scan action
};

const save = () => {
//   const urls = [];
console.log("dcscsc", urLink.value)
  urls.value.push({url:urLink.value, name: "link"});
  // Perform save action
};
const getDownload=()=>{
    getData(urLink.value)
}
</script>

<style></style>
