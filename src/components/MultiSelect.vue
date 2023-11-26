<template>
  <div tabindex="-1"
       class="multiselect"
       @blur="handleShowDropDown"
       @focus="handleShowDropDown">
    <template v-if="clientGroupOptionsSelected.length">
      <div
          v-for="selectedOption of clientGroupOptionsSelected"
          class="optionSelectedItem"
      >
        {{ selectedOption }}
        <button @click.prevent="removeFromSelected(selectedOption)" class="closeBtn">—</button>
      </div>

    </template>

    <div class="chooseGroup">
      <span>Выберите свою группу</span>
      <span
          class="removeAllFromSelected"
          @click="clientGroupOptionsSelected = []"
          v-if="clientGroupOptionsSelected.length">x</span>
    </div>
    <div
        v-if="showDropDown"
        class="clientGroupDropdown">
      <option
          v-for="option in clientGroupOptions"
          :value="option"
          @click="addToSelected(option)"
          v-text="option"
          class="clientGroupOption"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'multiSelect',
  props: {
    clientGroupOptions: {
      type:Array
    }
  },
  data(){
    return{
      showDropDown: false,
      clientGroupOptionsSelected: []
    }
  },
  methods: {
    onUpdate(){
      this.$emit('updated',this.clientGroupOptionsSelected)
    },
    handleShowDropDown() {
      this.showDropDown = !this.showDropDown
    },
    removeFromSelected(value) {
      const filteredArray = this.clientGroupOptionsSelected.filter(item => item !== value)
      this.clientGroupOptionsSelected = filteredArray
      this.onUpdate()
    },
    addToSelected(value) {
      const uniqueOptions = new Set(this.clientGroupOptionsSelected)
      if (uniqueOptions.has(value)) return
      else {
        console.log(uniqueOptions)
        this.clientGroupOptionsSelected.push(value)
        console.log(this.clientGroupOptionsSelected)
        this.onUpdate()
      }
    }
  }
}
</script>
<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
form {

}
</style>