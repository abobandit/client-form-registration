<script>
import LabeledInput from "@/components/LabeledInput.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import {required} from "@vuelidate/validators";
import PassportFormSector from "@/components/PassportFormSector.vue";
import AdressFormSector from "@/components/AdressFormSector.vue";
import { useVuelidate } from '@vuelidate/core'
export default {
  name: "FormRegistration",
  setup: () => ({ v$: useVuelidate() }),
  components: {
    AdressFormSector,
    PassportFormSector,
    MultiSelect,
    LabeledInput
  },
  validations: {
    dataForms:{
      firstName: required,
      lastName: required,
      birthday: required,
      phoneNumber: {
        required,
        valid: value => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value), // Валидация по шаблону
      },
      clientGroup:required,
    },
  },
  data() {
    return {
      dataForms: {
        firstName: '',
        lastName: '',
        patronymic: '',
        birthday: '',
        phoneNumber: '',
        gender: '',
        clientGroup: '',
        doctor: '',
        areNoNeededNotifications: false,
      },
      address:{
        index:'',
        country:'',
        region:'',
        town:'',
        street:'',
        house:'',
      },
      passport:{
        type:'',
        series:'',
        number:'',
        issuingAuthority:'',
        dateOfIssue:''

      },
      clientGroupOptions: ['VIP', 'Проблемные', 'ОМС'],
      doctorOptions: ['Иванов', 'Захаров', 'Чернышева'],
      types:['Паспорт', 'Свидетельство о рождении','Вод. удостоверение']
    }
  },
  methods:{
    formatPhoneNumber() {
      // Удаление всех символов, кроме цифр
      this.dataForms.phoneNumber = this.dataForms.phoneNumber.replace(/\D/g, '')
      const number = this.dataForms.phoneNumber
      // Добавление +7 и форматирование номера телефона
      if (number.length >= 1) {
        this.dataForms.phoneNumber =
            '+7 ('
            + number.slice(1, 4) + ') '
            + number.slice(4, 7) + '-'
            + number.slice(7, 9) + '-'
            + number.slice(9, 11)
      }
    },
    submitForm() {
      // Handle form submission logic here
      if (this.$v.address.$invalid) {
        console.log('Form is invalid');
        return;
      }
      // Form is valid, proceed with submission
      console.log('Form submitted!', this.address);
    }
  }
}
</script>

<template>
  <form>
    <LabeledInput label-for="" v-model="dataForms.firstName"/>
    <LabeledInput label-for="" v-model="dataForms.lastName"/>
    <LabeledInput label-for="" v-model="dataForms.patronymic"/>
    <input type="date" v-model="dataForms.birthday"/>
    <input type="text" @input="formatPhoneNumber()" v-model="dataForms.phoneNumber"/>
    <div>
      Выберите ваш пол:
      <label>
        Мужской
        <input type="radio" name="gender" v-model="dataForms.gender" value="male">
      </label>
      <label>
        Женский
        <input type="radio" name="gender" v-model="dataForms.gender" value="female">
      </label>
    </div>
    <multiSelect @updated="emittedArray=> dataForms.clientGroup = emittedArray"
                 :client-group-options="clientGroupOptions"/>
    <select v-model="dataForms.doctor">
      <option v-for="doctor of doctorOptions"
              v-text="doctor"
              :value="doctor"
      />
    </select>
    <label>
      Не отправлять смс
      <input type="checkbox" v-model="dataForms.areNoNeededNotifications">
    </label>
    <AdressFormSector :address="address"/>
    <PassportFormSector :types="types" :passport="passport"/>
    <button @click="submitForm" type="submit">Отправить</button>
  </form>
</template>

<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
form {

}
</style>