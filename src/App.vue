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
}
select{
  background: white;
}
body{
  height: 150vh;
  color: #000000;
  background:center/contain linear-gradient(to top right, #f67a7a 0%, #233ad3 100%) no-repeat  ;
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