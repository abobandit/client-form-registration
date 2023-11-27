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
  <label>
    <p>{{labelFor}}</p>

    <input type="text" :value="modelValue" @input="updateInput">
  </label>
</template>

<style scoped lang="scss">
label{
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
  color: #737373;
}
</style>