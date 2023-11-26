<template>
  <div class="passport">
    <select>
      <option v-for="type in types"
              value="type"
              v-text="type"
      />
    </select>
    <LabeledInput label-for="Серия" v-model="passport.series"/>
    <LabeledInput label-for="Номер" v-model="passport.number"/>
    <LabeledInput label-for="Кем выдан" v-model="passport.issuingAuthority"/>
    <label>
      Дата выдачи
      <input type="date">
    </label>
  </div>
</template>
<script>
import LabeledInput from "@/components/LabeledInput.vue"
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: 'PassportFormSector',
  components: {LabeledInput},
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    passport: {
      series: { required },
      number: { required },
      issuedBy: { required },
      issueDate: { required }
    }
  },
  props: {
    passport: {},
    types: Array
  }
}
</script>
<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
form {

}
</style>