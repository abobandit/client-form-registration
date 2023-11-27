<template>
  <div class="address">
    <h4>Адрес</h4>
    <LabeledInput label-for="Индекс" v-model="address.index"/>
    <LabeledInput label-for="Страна" v-model="address.country"/>
    <LabeledInput label-for="Область" v-model="address.region"/>
    <LabeledInput label-for="Город" v-model="address.town"/>
    <LabeledInput label-for="Улица" v-model="address.street"/>
    <LabeledInput label-for="Дом" v-model="address.house"/>
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
$width: 12rem;
$rounded: 9999px;
input[type="text"],
select,
button {
  width: calc(100% - 12px); /* Учитываем внутренние отступы */
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.address > * {
  margin-bottom: .3rem;
}
</style>