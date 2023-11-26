<script>
import LabeledInput from "@/components/LabeledInput.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import {required} from "@vuelidate/validators";

export default {
  name: "FormRegistration",
  components: {
    MultiSelect,
    LabeledInput
  },
  validations: {
    phoneNumber: {
      required,
      valid: value => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value), // Валидация по шаблону
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
      clientGroupOptions: ['VIP', 'Проблемные', 'ОМС'],
      doctorOptions: ['Иванов', 'Захаров', 'Чернышева'],
    }
  },
  methods:{
    formatPhoneNumber() {
      // Удаление всех символов, кроме цифр
      this.dataForms.phoneNumber = this.dataForms.phoneNumber.replace(/\D/g, '');

      // Добавление +7 и форматирование номера телефона
      if (this.dataForms.phoneNumber.length >= 1) {
        this.dataForms.phoneNumber = '+7 (' + this.dataForms.phoneNumber.slice(1, 4) + ') ' + this.dataForms.phoneNumber.slice(4, 7) + '-' + this.dataForms.phoneNumber.slice(7, 9) + '-' + this.dataForms.phoneNumber.slice(9, 11);
      }
    },
  }

}
</script>

<template>
  <form>
    <LabeledInput label-for="" v-model="dataForms.firstName"/>
    <LabeledInput label-for="" v-model="dataForms.lastName"/>
    <LabeledInput label-for="" v-model="dataForms.patronymic"/>
    <input type="date" v-model="dataForms.birthday"/>
    <input type="number" @input="formatPhoneNumber()" v-model="dataForms.phoneNumber"/>
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
    <!--
        <LabeledInput label-for="" v-model="dataForms."/>
        <LabeledInput label-for="" v-model="dataForms."/>
    -->

  </form>
</template>

<style scoped lang="scss">
$width: 12rem;
$rounded: 9999px;
form {

}
</style>