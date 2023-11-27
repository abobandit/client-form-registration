<script>
import LabeledInput from "@/components/LabeledInput.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import PassportFormSector from "@/components/PassportFormSector.vue";
import AdressFormSector from "@/components/AdressFormSector.vue";
import {minLength, required} from "vuelidate/lib/validators";

export default {
  name: "FormRegistration",
  components: {
    AdressFormSector,
    PassportFormSector,
    MultiSelect,
    LabeledInput
  },
  validations: {
    dataForms: {
      firstName: {
        minLength: minLength(4),
        onlyLetters: value => !value || /^[A-Za-zА-Яа-я]+$/.test(value)
      },
      lastName: {
        minLength: minLength(4),
        onlyLetters: value => !value || /^[A-Za-zА-Яа-я]+$/.test(value)
      },
      patronymic: {
        minLengthConditional: value => !value || minLength(5)(value),
        onlyLetters: value => !value || /^[A-Za-zА-Яа-я]+$/.test(value)
      },
      birthday: {
        required,
        validDate(value) {
          const today = new Date();
          const sevenYearsAgo = new Date();
          sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7);
          return new Date(value) <= sevenYearsAgo && new Date(value) <= today;
        },
      },
      phoneNumber: {
        required,
        valid: value => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value), // Валидация по шаблону
      },
      clientGroup: {
        required,
        valid: value => value.length

      },
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
      address: {
        index: '',
        country: '',
        region: '',
        town: '',
        street: '',
        house: '',
      },
      passport: {
        type: '',
        series: '',
        number: '',
        issuingAuthority: '',
        dateOfIssue: ''

      },
      clientGroupOptions: ['VIP', 'Проблемные', 'ОМС'],
      doctorOptions: ['Иванов', 'Захаров', 'Чернышева'],
      types: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение']
    }
  },
  methods: {
    formatPhoneNumber() {
      // Удаление всех символов, кроме цифр
      this.dataForms.phoneNumber = this.dataForms.phoneNumber.replace(/\D/g, '')
      const number = this.dataForms.phoneNumber
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
      console.log('                                      ')
      console.log('Вы отправили форму, проверяем данные')
      console.log('                                      ')
      console.log('                                      ')
      const dataForm = this.$v.dataForms
      const addressValidity = this.$refs.addressFormSector.checkValidity()
      const passportValidity = this.$refs.passportFormSector.checkValidity()
      if (!dataForm.patronymic.onlyLetters
          || !dataForm.firstName.onlyLetters
          || !dataForm.lastName.onlyLetters) {
        console.log('В полях имя, отчество и фамилия, должны быть только буквы ')
      }
      if (!dataForm.clientGroup.valid) {
        console.log('Выберите группу клиента')
      }
      if (!dataForm.patronymic.minLengthConditional) {
        console.log('в поле "отчество" должно быть больше 5 символов')
      }
      if (!dataForm.birthday.validDate) {
        console.log('вы должны быть старше 7 лет');
      }
      if (!dataForm.phoneNumber.valid) {
        console.log('в номере должно быть 11 цифр')
      }
      if (!addressValidity || !passportValidity || dataForm.$invalid) {
        console.log('Данные заполнены неверно');
        return;
      }
      console.log('Клиент успешно создан');
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="dataSector">
      <LabeledInput label-for="Имя" v-model="dataForms.firstName"/>
      <LabeledInput label-for="Фамилия" v-model="dataForms.lastName"/>
      <LabeledInput label-for="Отчество" v-model="dataForms.patronymic"/>
      <label>
        <p>Дата рождения</p>

        <input type="date" v-model="dataForms.birthday"/>
      </label>
      <LabeledInput label-for="Номер телефона" @input="formatPhoneNumber()" v-model="dataForms.phoneNumber"/>
      <div class="selectGender">
        <p>Выберите ваш пол</p>
        <div class="inputWrapper">
          <label>
            <p>Мужской</p>
            <input type="radio" name="gender" v-model="dataForms.gender" value="male">
          </label>
          <label>
            <p>Женский</p>
            <input type="radio" name="gender" v-model="dataForms.gender" value="female">
          </label>
        </div>
      </div>
      <label class="selectDoctor">

        <p>Лечащий врач</p>
        <select v-model="dataForms.doctor">
          <option v-for="doctor of doctorOptions"
                  v-text="doctor"
                  :value="doctor"
          />
        </select>
      </label>
      <div class="multiSelectContainer">
        <p>f</p>
        <multiSelect @updated="emittedArray=> dataForms.clientGroup = emittedArray"
                     :client-group-options="clientGroupOptions"/>

      </div>

    </div>
    <label class="smsWrapper">
      <p>Не отправлять смс</p>
      <input type="checkbox" v-model="dataForms.areNoNeededNotifications">
    </label>
    <AdressFormSector ref="addressFormSector" :address="address"/>
    <PassportFormSector ref="passportFormSector" :types="types" :passport="passport"/>
    <button @click="submitForm" type="submit">Отправить</button>
  </form>
</template>

<style scoped lang="scss">
$rounded: 9999px;
$sectorWidth:330px;
input[type="date"]{
  width: 100%;
}
form {
  $paddingWidth:calc($sectorWidth/40);
  $formPaddingWidth:calc($paddingWidth*3);
  $formPaddingHeight:calc($sectorWidth/50);
  $columnGap:2rem;
  $columnWidth:calc(($sectorWidth - ($formPaddingHeight + $formPaddingWidth))/2);
  $inputWidth:calc($columnWidth + $columnGap/2);
  margin-top: 4rem;
  font-size: .9em;
  width: 400px;
  font-family: Arial, sans-serif;
  padding: $formPaddingHeight $formPaddingWidth;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  height: min-content;
  & > * {
    margin-bottom: 1rem;
  }
  .dataSector {
    $columnWidth:calc(($sectorWidth - ($formPaddingHeight + $formPaddingWidth))/2);
    display: grid;
    grid-template-columns: repeat(2, $columnWidth);
    grid-template-rows:repeat(4, 3.1rem);
    grid-column-gap: $columnGap;
    grid-row-gap: calc($columnGap/4);
    .multiSelectContainer{
      .multiselect{
        width: $inputWidth;

      }
      p{
        visibility: hidden;
      }
    }
    select {
      width: 100%;
      height: min-content;
    }
    .selectGender {
      display: grid;
      grid-template-rows: 2fr 3fr;
      color: #737373;
      .inputWrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        label {
          color:black;
          display: flex;
          justify-content: center;
          align-items: center;
          *:nth-child(1) {
            margin-right: .3rem;
          }
        }
      }
    }

    label {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: left;
      color: #737373;
      height: 100%;
      input:not(input[type="radio"]),select{
        width: $inputWidth;
      }
    }

    .selectWrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .smsWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin-right: .7rem;
      }
    }

  }
}

select {
  width: 75%;
}

.label {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 0.5rem;
}

button {
  width: calc(100% - 15px); /* Учитываем внутренние отступы */
  padding: 4px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 5px;
  vertical-align: middle;
}

button {
  background-color: #1798ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: .75rem;
  cursor: pointer;
}

button:hover {
  background-color: #168f3f;
}

// Стили для radio и checkbox
input[type="radio"],
input[type="checkbox"] {
  margin-right: 5px;
  vertical-align: middle;
}


</style>