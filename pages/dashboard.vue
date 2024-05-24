<template>
  <v-container>
    <!-- QR code scanning section -->
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

    <!-- Text field for entering URL -->
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

    <!-- Table to display receipt data -->
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Key
          </th>
          <th class="text-left">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in receiptData" :key="key">
          <td>{{ receiptData }}</td>
          <!-- <td>{{ value }}</td> -->
        </tr>
      </tbody>
    </v-table>

    <!-- Buttons for scanning, saving, and downloading -->
    <v-row>
      <v-col class="ma-8 d-flex mx-auto justify-space-evenly">
        <v-btn color="primary" @click="scan" variant="outlined"> Scan </v-btn>
        <v-btn color="primary" @click="save" variant="outlined"> Save </v-btn>
        <v-btn color="primary" @click="getDownload" variant="outlined"> Download </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { getData } from '../services/httpService.js';

const startScan = ref(false);
const urLink = ref("https://itax.kra.go.ke/KRA-Portal/invoiceChk.htm?actionCode=loadPage&invoiceNo=0040804130000058920");
const sendError = ref(null);
const receiptData = ref([]);

// Function to handle QR code detection
const onDetect = (value) => {
  urLink.value = value[0].rawValue;
  sendError.value = value;
  // Call getData function when URL is detected
  getData(urLink.value)
    .then(data => {
      receiptData.value = data;
      console.log(data, "sdashgavhgvhg")
    })
    .catch(error => {
      console.error('Failed to get data:', error);
    });
};

// Function to toggle QR code scanning
const scan = () => {
  startScan.value = !startScan.value;
};

// Function to save URL
const save = () => {
  // Placeholder function, adjust as needed
};

// Function to download data
const getDownload = async () => {
  const data = await getData(urLink.value);
  console.log(data, "dcjhdcscbhj")
 receiptData.value.push(data)
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
