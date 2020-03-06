<template>
  <Secure>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  </Secure>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Secure from '@/components/secure.vue'

export default {
  name: 'Home',
 // mixins: [secureMixin],
  components: {
    HelloWorld, Secure
  },
  methods: {
    //onUserChanged: function(newUser) {}
  }
}
</script>
