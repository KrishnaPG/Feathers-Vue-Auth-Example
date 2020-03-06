<template>
<Secure>
  <div class="about">
    <h1>This is an about page</h1>

    <a-button @click="logout">Logout</a-button>
  </div>
</Secure>
</template>
<script>
import Secure from '@/components/secure.vue'

import AButton from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style';

import Store from '@/store';
import authClient from '@/auth';

export default {
  name: 'About',
  components: {
    Secure, AButton
  },
  methods: {
    logout: function() {
        authClient.logout().then(() => Store.clearUser());
    }	
  }
}
</script>