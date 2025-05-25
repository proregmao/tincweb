<template>
  <el-container>
    <el-header>Dashboard</el-header>
    <el-main>
      <el-button @click="loadData">Load Clients</el-button>
      <el-table :data="clients" style="width:100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="status" label="Status" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const clients = ref([]);
const loadData = async () => {
  const { data } = await axios.get('/api/clients');
  clients.value = data;
};
</script>
