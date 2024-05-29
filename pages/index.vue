<template>
  <v-container>
    <!-- QR code scanning section -->
    <v-card variant="outline" elevation="0" class="d-flex mx-auto justify-center" width="250" height="250">
      <v-icon @click="scan" v-if="!startScan" size="250" color="#212121" aria-hidden="true">
        mdi-qrcode-scan
      </v-icon>
      <qrcode-stream v-if="startScan" width="100" height="100" @detect="onDetect"></qrcode-stream>
    </v-card>

    <!-- Text field for entering URL -->
    <v-card-text>
      <v-text-field v-model="urLink" clearable append-inner-icon="mdi-content-copy" density="compact" label=""
        variant="outlined" hide-details single-line @click:append-inner="onClick"></v-text-field>
    </v-card-text>
    {{ sendError }}

   
    <v-data-table-server  v-model:items-per-page="itemsPerPage" :headers="headers" :items="receiptData"
      :items-length="totalItems" :loading="loading" item-value="Supplier Name" @update:options="loadItems"></v-data-table-server>
    <!-- Buttons for scanning, saving, and downloading -->
    <v-row>
      <v-col class="ma-8 d-flex mx-auto justify-space-evenly">
        <v-btn color="primary" @click="scan" variant="outlined"> Scan </v-btn>
        <!-- <v-btn color="primary" @click="save" variant="outlined"> Save </v-btn> -->

        <!-- <JsonExcel :data="receiptValue" > -->
   
          <v-btn color="primary" @click="getDownload" variant="outlined">
            Download
          </v-btn>
  <!-- </JsonExcel> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { getData } from "../services/httpService.js";
import { excelDownload } from "~/services/excelService.js";

const startScan = ref(false);
const urLink = ref(
  "https://itax.kra.go.ke/KRA-Portal/invoiceChk.htm?actionCode=loadPage&invoiceNo=0040804130000058920"
);
const sendError = ref(null);
const receiptData = ref([]);
const itemsPerPage = ref(0)
const totalItems = ref(0)
const loading = ref(false)
const headers = ref([
  {
    title: "CUI",
    align: "start",
    sortable: false,
    value: 'Control Unit Invoice Number',
  },
  { title: "Invoice Date", value: "Invoice Date", align: "start" },
  { title: "Supplier Name", value: "Supplier Name", align: "end" },
  // { title: "Total Invoice Amount", value: "fat", align: "end" },
  { title: "Total Taxable Amount", value: "Total Taxable Amount", align: "end" },
]);

// Function to handle QR code detection
const onDetect = async (value) => {
  loading.value = true
  urLink.value = value[0].rawValue;
  sendError.value = value;
 await scan()
  // Call getData function when URL is detected
  // getData(urLink.value)
  //   .then((data) => {
  //     receiptData.value = data;
  //     console.log(data, "sdashgavhgvhg");
  //   })
  //   .catch((error) => {
  //     console.error("Failed to get data:", error);
  //   });

  urLink.value = "";
  loading.value = false

};

// Function to toggle QR code scanning
const scan = async () => {
  loading.value = true
  // startScan.value = !startScan.value;
  const data = await getData(urLink.value);
  loading.value = false
  receiptData.value.push(data);
  console.log(receiptData.value, "dcjhdcscbhj");
};

// Function to save URL
const save = () => {
  // Placeholder function, adjust as needed
};

// Function to download data
const getDownload =  () => {

   excelDownload(receiptData.value)
  //   const data = await getData(urLink.value);
  //   console.log(data, "dcjhdcscbhj")
  //  receiptData.value.push(data)
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
