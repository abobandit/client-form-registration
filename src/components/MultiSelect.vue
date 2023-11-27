<template>
  <div tabindex="-1"
       ref="child"
       class="multiselect"
       @focusin="handleFocusIn"
       @blur="handleFocusOut">
    <div class="chooseGroup">

      <span>Выберите свою группу</span>
      <span
          class="removeAllFromSelected"
          @click="clientGroupOptionsSelected.splice(0, clientGroupOptionsSelected.length)"
          v-if="clientGroupOptionsSelected.length">x</span>
    </div>
    <div
        v-if="showDropDown"
        class="clientGroupDropdown">
      <div
          v-for="option in clientGroupOptions"
          :class="{
            'selectedOption':checkSelected(option)
          }"
          @click="addToSelected(option)"
          class="clientGroupOption">
        <p>
          {{ option }}
        </p>
        <div  v-if="checkSelected(option)">
          <button ref="relatedTarget" @mousedown.prevent="removeFromSelected(option)" class="closeBtn">—</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'multiSelect',
  props: {
    clientGroupOptions: {
      type: Array
    }
  },
  data() {
    return {
      showDropDown: false,
      clientGroupOptionsSelected: []
    }
  },
  methods: {
    checkSelected(option) {
      return this.clientGroupOptionsSelected.filter(item => option === item).length
    },
    onUpdate() {
      this.$emit('updated', this.clientGroupOptionsSelected)
    },
    handleFocusOut(){
        this.showDropDown = false;
    },
    handleFocusIn() {
      this.showDropDown = true
    },
    removeFromSelected(value) {
      this.clientGroupOptionsSelected = this.clientGroupOptionsSelected.filter(item => item !== value)
      this.onUpdate()
    },
    addToSelected(value) {
      const uniqueOptions = new Set(this.clientGroupOptionsSelected)
      if (uniqueOptions.has(value)) {
        return false
      } else {
        this.clientGroupOptionsSelected.push(value)
        this.onUpdate()
      }
    }
  }
}
</script>
<style scoped lang="scss">
$width:180px;
$columnGap:2rem;
$sectorWidth:330px;
$paddingWidth:calc($sectorWidth/40);
$formPaddingWidth:calc($paddingWidth*3);
$formPaddingHeight:calc($sectorWidth/50);
$columnWidth:calc(($sectorWidth - ($formPaddingHeight + $formPaddingWidth))/2);
$inputWidth:calc($columnWidth + $columnGap/2);
.clientGroupDropdown {
  width: $inputWidth;
  margin: 0 auto 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  text-align: left;
  position: absolute;

}

.multiselect {
  width: $inputWidth;
  margin: auto;
  position: relative;
}

.clientGroupDropdown .clientGroupOption {
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  &.selectedOption{
    background: #1798ff;
    .closeBtn {
      background: #ffffff;
      color: #111111;
      border-radius: 9999px;
      padding: 1px;

    }
    &:hover{
      transition: background-color 200ms ease-in-out;
      background: #56b8f5;
    }
  }
  &:not(.selectedOption):hover {
    background: rgba(235, 240, 230, 0.4);
  }
}

.chooseGroup {
  border-bottom: 1px solid black;
  width: $inputWidth;
  display: flex;
  justify-content: space-between;

  margin: 0 auto;
}

.optionSelectedItem {
  background: #e8e8e8;
  width: fit-content;
  border-radius: 9999px;
  margin: 0 auto;
  padding: 3px 6px;

}

.removeAllFromSelected {
  padding:0px 5px;
  border-radius: 9999px;
  cursor: pointer;
}
</style>