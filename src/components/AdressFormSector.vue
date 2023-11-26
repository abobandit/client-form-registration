<template>
  <div class="address">
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
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: 'AdressFormSector',
  components: {LabeledInput},
  setup: () => ({ v$: useVuelidate() }),
  props: {
    address: {}
  },
  validations: {
    address: {
      index: { required },
      country: { required },
      region: { required },
      city: { required },
      street: { required },
      house: { required }
    }
  },
}
</script>
<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
form {

}
</style>