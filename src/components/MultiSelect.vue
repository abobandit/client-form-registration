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
      this.clientGroupOptionsSelected = this.clientGroupOptionsSelected.filter(item => item !== value)
      this.onUpdate()
    },
    addToSelected(value) {
      const uniqueOptions = new Set(this.clientGroupOptionsSelected)
      if (uniqueOptions.has(value))
      else {
        console.log(uniqueOptions)
        this.clientGroupOptionsSelected.push(value)
        this.onUpdate()
      }
    }
  }
}
</script>
<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
// Стили для мульти-селекта
.multiselect{
  //background: #e3dfdf;
}
.clientGroupDropdown {
  width: 200px;
  margin: 0 auto 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  text-align: left;

}

.clientGroupDropdown .clientGroupOption {
  border-bottom: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  padding: 4px;
  z-index: 10;
  &:hover{
    background: rgba(235, 240, 230, 0.4);
  }
}
.chooseGroup{

  border-bottom: 1px solid black;
  width:200px;
  display: flex;
  justify-content: space-between;

  margin: 0 auto;
}
.optionSelectedItem{
  background: #e8e8e8;
  width: fit-content;
  border-radius: 9999px;
  margin: 0 auto;
  padding: 3px 6px;
  .closeBtn{
    background: black;
    color: white;
    border-radius: 9999px;
    font-weight: bold;
    padding: 0 3px;
  }
}
.removeAllFromSelected{
  padding: 2px 5px;
  border-radius: 9999px;
  cursor: pointer;
}
</style>