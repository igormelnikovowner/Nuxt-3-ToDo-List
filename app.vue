<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import SecureLS from 'secure-ls';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { setNotesToStore, setLsToStore } = userStore;
    onMounted(() => {
      const ls = new SecureLS({ encodingType: 'aes', encryptionSecret: key });
      if (ls.get('notes')) {
        setNotesToStore(ls.get('notes'));
      }
      setLsToStore(ls);
    })
    return {};
  }
});
</script>
