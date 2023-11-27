<script>

export default{
  name: "LabeledInput",
  props: {
    modelValue: [String, Number],
    labelFor: [String],
  },
    methods:{
      updateInput(event) {
        this.$emit('input', event.target.value)
      }
    }
}
</script>

<template>
  <label >
    {{labelFor}}
    <input type="text" :value="modelValue" @input="updateInput">
  </label>
</template>

<style scoped lang="scss">
label{
  display:grid;
  grid-template-columns: repeat(2,1fr);
}
</style>