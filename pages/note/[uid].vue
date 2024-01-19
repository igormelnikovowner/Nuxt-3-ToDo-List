<template>
  <div class="w-full">
    <div>
      <Button class="bg-red-500 text-white w-72" type="button" @click="toNotesLayout">
        {{ $t('Назад') }}
      </Button>
      uid ------- {{ $route.params.uid }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserNote from '~/components/notes/UserNote.vue';
import Button from '~/components/basic/Button.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    UserNote,
    Button,
  },
  setup() {
    definePageMeta({
      layout: 'notelayout',
    });
    const userStore = useUserStore();
    const { nickname, notes } = storeToRefs(userStore);

    const completed = notes.value.filter((n) => n.isDone);
    const uncompleted = notes.value.filter((n) => !n.isDone);

    const toNotesLayout = () => {
      navigateTo("/notes");
    }

    return { nickname, completed, uncompleted, toNotesLayout };
  }
});
</script>

