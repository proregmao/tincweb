<template>
  <el-form @submit.prevent="onLogin" :model="form">
    <el-form-item label="Username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-button type="primary" native-type="submit">Login</el-button>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const form = reactive({ username: '', password: '' });
const onLogin = async () => {
  const { data } = await axios.post('/api/auth/login', form);
  localStorage.setItem('token', data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  router.push('/');
};
</script>
