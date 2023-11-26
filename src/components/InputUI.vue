<script>

export default {
  name: "InputUI",
  props:{
    modelValue:[String,Number]
  },
  methods:{
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="updateInput">
</template>

<style scoped lang="scss">

</style>