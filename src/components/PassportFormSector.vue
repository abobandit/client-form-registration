<template>
  <div class="passport">
    <h4>Пасспорт</h4>
    <select>
      <option v-for="type in types"
              value="type"
              v-text="type"
      />
    </select>
    <div class="inputWrapper">

      <LabeledInput label-for="Серия" v-model="passport.series"/>
      <LabeledInput label-for="Номер" v-model="passport.number"/>
      <LabeledInput label-for="Кем выдан" v-model="passport.issuingAuthority"/>
      <label class="dateOfIssue">
        Дата выдачи
        <input v-model="passport.dateOfIssue" type="date">
      </label>
    </div>
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
$sectorWidth:330px;
$paddingWidth:calc($sectorWidth/40);
$formPaddingWidth:calc($paddingWidth*3);
$formPaddingHeight:calc($sectorWidth/50);
$columnWidth:calc(($sectorWidth - ($formPaddingHeight + $formPaddingWidth))/2);
$columnGap:2rem;
$inputWidth:calc($columnWidth  +  $columnGap/2);
select {
  width: calc($sectorWidth + $paddingWidth*2); /* Учитываем внутренние отступы */
  padding: 2px 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 1.5rem;

}

input:not(input[type="radio"]){
  width: $inputWidth;
}
.dateOfIssue{
  display:grid;
  grid-template-columns: 1fr;
  justify-items: left;
  width: 100%;
  color: #737373;
}
.passport{
  & > h4 {
    margin-bottom: .5rem;
  }
   & >.inputWrapper{
     display: grid;
     grid-template-columns: repeat(2, $columnWidth);
     grid-template-rows:repeat(2, 3.1rem);
     grid-row-gap: calc($columnGap/4);
     grid-column-gap: $columnGap;
     &>*{
       margin-bottom: .3rem;
     }
   }
}

</style>