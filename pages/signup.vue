<template>
  <UserForm type="signup" />
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import UserForm from '../components/auth/UserForm.vue';

export default defineComponent({
  components: {
    UserForm,
  },
  setup() {
    definePageMeta({
      layout: 'authlayout',
    });
  }
});
</script>
