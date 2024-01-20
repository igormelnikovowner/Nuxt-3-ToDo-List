<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { setNotesToStore } = userStore;

    onMounted(() => {
      if (localStorage.getItem('notes')) {
        setNotesToStore(localStorage.getItem('notes')!);
      }
      // var ls = new SecureLS({ encodingType: 'aes', isCompression: false, encryptionSecret: key });

      // if (ls.get('encryptedData')) {
      //   setNotesToStore(ls.get('encryptedData'), ls);
      // }
    })
    return {};
  }
});
</script>
