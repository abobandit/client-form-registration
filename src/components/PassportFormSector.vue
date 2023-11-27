<template>
  <div class="passport">
    <h4>Пасспорт</h4>
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
      <input v-model="passport.dateOfIssue" type="date">
    </label>
  </div>
</template>
<script>
import LabeledInput from "@/components/LabeledInput.vue"
import {required} from "vuelidate/lib/validators";

export default {
  name: 'PassportFormSector',
  components: {LabeledInput},
  validations: {
    types:{required},
    passport: {
      dateOfIssue: { required },
      series:{
        onlyDigits:value => !value || /^\d+$/.test(value)
      },
      number:{
        onlyDigits:value => !value || /^\d+$/.test(value)
      },
    }
  },
  props: {
    passport: {},
    types: Array
  },
  methods:{
    checkValidity(){
      const passport = this.$v.passport
      if ( passport.$invalid || !passport.number.onlyDigits || !passport.series.onlyDigits ) {
        if (4!==this.passport.series.length){
          console.log('серия пасспорта должна иметь 4 цифры')
        }
        if (6 !==this.passport.number.length){
          console.log('номер пасспорта должен иметь 6 цифры')
        }
        console.log('Паспортные данные заполнены неверно')
        return false
      }else{
        console.log('Паспортные данные заполнены верно')
        return true
      }


    }
  }
}
</script>
<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
input[type="text"],
input[type="date"],
select,
button {
  width: calc(100% - 12px); /* Учитываем внутренние отступы */
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.passport>*{
    margin-bottom: .3rem;
}
</style>