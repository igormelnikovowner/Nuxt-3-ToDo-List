<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup v-if="type === 'signup'" v-model="userForm.name" type="text" label="Full Name" placeholder="Enter your nickname" :errorMessage="errorBag.name" />
    <FormGroup v-model="userForm.email" type="email" label="Email" placeholder="Enter your email" :errorMessage="errorBag.email" />
    <FormGroup  v-model="userForm.password" type="password" label="Password" placeholder="At least 6 characters" :errorMessage="errorBag.password" />

    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit">
        {{ type === "signin" ? "Login" : "Register" }}
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
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
    const userForm = reactive({
      name: "",
      email: "",
      password: "",
    });

    const { errorBag, login, signUp } = useAuth();

    const processForm = () => {
      if (props.type == "signin") {
        login(userForm);
      } else {
        signUp(userForm);
      };
    };

    return { userForm, processForm, errorBag  };
  }
});
</script>
