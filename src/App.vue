<template>
 <div id="app">
   <FormRegistration/>

  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
select{
  background: white;
}
body{
  color: #000000;
}
*{
  font-family: 'Roboto', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<script>
import FormRegistration from "@/components/FormRegistration.vue";

export default {
  name:"App",
  components:{
    FormRegistration
  },
}
</script>