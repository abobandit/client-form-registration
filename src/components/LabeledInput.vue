<script>
import InputUI from "@/components/InputUI.vue";

export default{
  name: "LabeledInput",
  components:{
    InputUI
  },
  props:{
    modelValue: [String,Number],
    labelFor:[String]
  }
}
</script>

<template>
  <label>
    {{labelFor}}
    <InputUI v-model="modelValue"/>
  </label>
</template>

<style scoped lang="scss">

</style>