<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup v-if="type === 'signup'" :model-value="userForm.name" type="text" label="Ник" placeholder="Enter your nickname" :errorMessage="errorBag.name" @update:modelValue="changeName"/>
    <FormGroup :model-value="userForm.email" type="email" label="Емейл" placeholder="Enter your email" :errorMessage="errorBag.email" @update:modelValue="changeEmail"/>
    <FormGroup  :model-value="userForm.password" type="password" label="Пароль" placeholder="At least 6 characters" :errorMessage="errorBag.password" @update:modelValue="changePass"/>

    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit">
        {{ type === "signin" ? "Войти" : "Зарегистрироваться" }}
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormGroup from './FormGroup.vue';
import Button from '../basic/Button.vue';

export default defineComponent({
  name: 'UserForm',
  props: {
    type: {
      type: String,
      default: 'signin',
      validator: (value: string) => ["signin", "signup"].includes(value),
    },
  },
  components: {
    FormGroup,
    Button,
  },
  setup(props) {
    const userForm = ref({
      name: "",
      email: "",
      password: "",
    });

    const { errorBag, login, signUp } = useAuth();

    const processForm = () => {
      if (props.type == "signin") {
        login(userForm.value);
      } else {
        signUp(userForm.value);
      };
    };

    const changeName = (val: string) => {
      userForm.value.name = val;
    };
    const changeEmail = (val: string) => {
      userForm.value.email = val;
    };
    const changePass = (val: string) => {
      userForm.value.password = val;
    };

    return { userForm, processForm, errorBag, changeName, changeEmail, changePass };
  }
});
</script>
