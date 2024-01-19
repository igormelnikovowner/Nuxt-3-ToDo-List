<template>
  <header class="w-full h-20 bg-gray-900 px-6 py-1 flex items-center justify-between">
    <div class="flex justify-between items-center">
      <p class="text-2xl font-semibold text-slate-50">Notes App</p>
    </div>

    <div class="flex space-x-4 items-center">
      <MenuLink v-if="!isLoggedIn" href="/" :class="$route.fullPath === '/' ? 'text-cyan-400 underline' : 'text-gray-50'">Sign In</MenuLink>
      <MenuLink v-if="!isLoggedIn" href="/signup" :class="$route.fullPath === '/signup' ? 'text-cyan-400 underline' : 'text-gray-50'">Sign Up</MenuLink>
      <MenuLink v-if="isLoggedIn" href="/" class="text-gray-50 underline" type="signOut" >Выйти</MenuLink>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  setup() {
    const isLoggedIn = useState("loginState", () => false);

    if (process.server) {
      const authCookie = useCookie("authCookie");
      isLoggedIn.value = authCookie.value ? true : false;
    } else {
      const { user } = useAuth();
      watch(() => user.value, (val)=> {
        isLoggedIn.value = val ? true : false
      });
    }

    return { isLoggedIn };
  },
});
</script>
