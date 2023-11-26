<template>
<!--  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>-->
<FormRegistration/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  font-family: 'Roboto', sans-serif;

  margin:0;
  padding: 0;
  box-sizing: border-box;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import FormRegistration from "@/components/FormRegistration.vue";
export default {
  name:"App",
  components:{
    FormRegistration
  },
  data(){
    return{

    }
  },
}
</script>