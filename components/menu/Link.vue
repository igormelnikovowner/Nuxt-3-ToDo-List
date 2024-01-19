<template>
  <NuxtLink class="font-semibold text-xl" :to="href" @click="signOut">
     <slot />
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Link',
  props: {
    href: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { logout } = useAuth();
    const signOut = () => {
      if (props.type === 'signOut') {
        logout();
      }
    };

    return { signOut };
  },
});
</script>
