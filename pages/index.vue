<template>
  <v-container>
    <!-- QR code scanning section -->
    <v-card variant="outline" elevation="0" class="d-flex mx-auto justify-center" width="250" height="250">
      <v-icon @click="open" v-if="!startScan" size="250" color="#212121" aria-hidden="true">
        mdi-qrcode-scan
      </v-icon>
      <qrcode-stream v-if="startScan" width="100" height="100" @detect="onDetect"></qrcode-stream>
    </v-card>

    <!-- Text field for entering URL -->
    <v-card-text>
      <v-text-field v-model="urLink" @change="onDetect" clearable :loading="loading" append-inner-icon="mdi-content-copy" density="compact" label=""
        variant="outlined" hide-details single-line @click:append-inner="onClick"></v-text-field>
    </v-card-text>
    {{ sendError }}

    <!-- Data table -->
    <v-data-table-server v-model:items-per-page="itemsPerPage" :loading="loading" :headers="headers"
      :items="receiptData" :items-length="totalItems"  item-value="Supplier Name"
      @update:options="loadItems"></v-data-table-server>

    <!-- Buttons for scanning, saving, and downloading -->
    <v-row>
      <v-col class="ma-8 d-flex mx-auto justify-space-evenly">
        <v-btn color="primary" @click="scan" variant="outlined"> Add </v-btn>
        <v-btn color="primary" @click="getDownload" variant="outlined"> Download </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { getData } from '../services/httpService.js';
import { excelDownload } from '~/services/excelService.js';

const startScan = ref(false);
const loadingURL = ref(false);
const urLink = ref(
  'https://itax.kra.go.ke/KRA-Portal/invoiceChk.htm?actionCode=loadPage&invoiceNo=0040804130000058920'
);
const sendError = ref(null);
const receiptData = ref([]);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const headers = ref([
  {
    title: 'CUI',
    align: 'start',
    sortable: false,
    value: 'Control Unit Invoice Number',
  },
  { title: 'Invoice Date', value: 'Invoice Date', align: 'start' },
  { title: 'Supplier Name', value: 'Supplier Name', align: 'end' },
  { title: 'Total Taxable Amount', value: 'Total Taxable Amount', align: 'end' },
]);

const onDetect = (value) => {
  loadingURL.value = true;
  urLink.value = value[0].rawValue;
  // await scan();
  loadingURL.value = false;
};

const scan = async () => {
  loading.value = true
  try {
    const data = await getData(urLink.value);
    loading.value = false
    urLink.value = ''

    receiptData.value.push(data);
    totalItems.value = receiptData.value.length;
  } catch (error) {
    loading.value = false

    sendError.value = 'Failed to retrieve data.';
    console.error(error);
  }
};

// const toggleScan = () => {
//   startScan.value = !startScan.value;
// };

const open = () => {
  startScan.value = true;
};

const getDownload = () => {
  excelDownload(receiptData.value);
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
