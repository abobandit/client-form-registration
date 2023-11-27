<template>
  <div class="address">
    <h4>Адрес</h4>
    <div class="inputWrapper">
      <LabeledInput label-for="Индекс" v-model="address.index"/>
      <LabeledInput label-for="Страна" v-model="address.country"/>
      <LabeledInput label-for="Область" v-model="address.region"/>
      <LabeledInput label-for="Город" v-model="address.town"/>
      <LabeledInput label-for="Улица" v-model="address.street"/>
      <LabeledInput label-for="Дом" v-model="address.house"/>
    </div>
  </div>
</template>
<script>
import LabeledInput from "@/components/LabeledInput.vue"
import {minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'AdressFormSector',
  components: {LabeledInput},
  props: {
    address: Object
  },
  /*validations() {
    const validations = {}
    Object.keys(this.address).forEach(key => {
      validations[key] = { required,minLength: minLength(3) }
    })
    return { address: validations };
  },*/
  validations: {
    address: {
      country: {
        required,
        onlyLetters: value => !value || /^[a-zA-Z\s\-'"ёЁ]+$/.test(value)
      },
      town: {
        required,
        minLength: minLength(3),
        onlyLetters: value => !value || /^[a-zA-Z\s\-'"ёЁ]+$/.test(value)
      },
      region: {
        onlyLetters: value => !value || /^[a-zA-Z\s\-'"ёЁ]+$/.test(value)
      }
    }
  },
  methods: {
    checkValidity() {
      const address = this.$v.address
      if (address.$invalid
          || !address.country.onlyLetters
          || !address.town.onlyLetters
          || !address.region.onlyLetters) {
        console.log('адресс заполнен неверно')
        return false
      } else {
        console.log('адресс заполнен верно')
        return true
      }

    },
  }
}
</script>
<style scoped lang="scss">
$rounded: 9999px;
$sectorWidth:330px;
$paddingWidth:calc($sectorWidth/40);
$formPaddingWidth:calc($paddingWidth*3);
$formPaddingHeight:calc($sectorWidth/50);
$columnWidth:calc(($sectorWidth - ($formPaddingHeight + $formPaddingWidth))/2);
$columnGap:2rem;
$inputWidth:calc($columnWidth + $columnGap/2  );

input:not(input[type="radio"]),select{
  width: $inputWidth;
}
.address {
  & > h4{
    margin-bottom: .5rem;
  }
  & > .inputWrapper {
    display: grid;
    grid-template-columns: repeat(2, $columnWidth);
    grid-template-rows:repeat(3, 3.1rem);
    grid-column-gap: $columnGap;
    grid-row-gap: calc($columnGap/4);
    justify-items: left;
    & > * {
      margin-bottom: .3rem;
    }
  }
}

</style>