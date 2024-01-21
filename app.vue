<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import SecureLS from 'secure-ls';
import { defineComponent } from 'vue';
import forge from 'node-forge';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { setNotesToStore, setLsToStore } = userStore;
    onMounted(() => {
      var keyPair = forge.pki.rsa.generateKeyPair({ bits: 1024 });

      var publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
      var privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

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
