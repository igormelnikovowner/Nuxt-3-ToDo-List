<template>
  <header class="w-full h-12 sm:h-20 bg-gray-900 px-6 py-1 flex items-center justify-between">
    <div class="flex justify-between items-center">
      <p class="text-xl sm:text-2xl font-semibold text-slate-50">Дневник</p>
    </div>

    <div class="flex space-x-4 items-center text-lg sm:text-2xl ">
      <MenuLink v-if="!isLoggedIn" href="/" :class="$route.fullPath === '/' ? 'text-cyan-400 underline' : 'text-gray-50'">Вход</MenuLink>
      <MenuLink v-if="!isLoggedIn" href="/signup" :class="$route.fullPath === '/signup' ? 'text-cyan-400 underline' : 'text-gray-50'">Регистрация</MenuLink>
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
