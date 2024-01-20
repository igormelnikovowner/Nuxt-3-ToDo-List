<template>
  <div class="w-full">
    <h2 class="font-bold text-4xl text-center mb-12">
      Доброго времени суток, {{ nickname }}! {{ completed.length ? 'Ваши задачи:' : 'Добавьте новые задачи'}}
    </h2>
    <div v-if="completed.length || uncompleted.length" class="flex w-full mb-8" :class="!uncompleted.length || !completed.length ? 'justify-center' : 'justify-between'">
      <template v-if="uncompleted.length">
        <div class="w-2/5">
          <div class="mb-4">
            <h3 class="font-bold text-2xl text-center">
              <span class="border-b-2 border-black">
                Незавершенные задачи
              </span>
            </h3>
          </div>
          <div v-for="note, i in uncompleted" :key="note.uid">
            <UserNote :note="note" :idx="i + 1" />
          </div>
        </div>
      </template>

      <template v-if="completed.length">
        <div class="w-2/5">
          <div class="mb-4">
            <h3 class="font-bold text-2xl text-center">
              <span class="border-b-2 border-black">
                {{ $t('Выполненные задачи') }}
              </span>
            </h3>
          </div>
          <div v-for="note, i in completed" :key="note.uid">
            <UserNote :note="note" :idx="i + 1" />
          </div>
        </div>
      </template>
    </div>

    <div v-else-if="!loading">
      <h2 class="font-bold text-2xl text-center mb-12">
        {{ $t('Вы еще не добавили ни одной заметки(((') }}
      </h2>
    </div>

    <div v-else>
      <h2 class="font-bold text-2xl text-center mb-12">
        {{ $t('Загружаем заметки...') }}
      </h2>
    </div>

    <div class="flex w-full justify-center">
      <Button class="bg-blue-500 text-white w-72" type="button" @click="toNoteLayout(new Date().getTime())">
        {{ $t('Добавить новую заметку') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserNote from '../components/notes/UserNote.vue';
import Button from '../components/basic/Button.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    UserNote,
    Button,
  },
  setup() {
    definePageMeta({
      layout: 'noteslayout',
    });
    const userStore = useUserStore();
    const { nickname, notes, getNotes } = storeToRefs(userStore);
    const loading = ref(true);

    watch(() => notes.value, () => {
      loading.value = false;
    });

    const completed = computed<INote[]>(
      () => notes.value.filter((n) => n.isDone),
    );
    const uncompleted = computed<INote[]>(
      () => notes.value.filter((n) => !n.isDone),
    );

    const toNoteLayout = (uid?: number) => {
      navigateTo(`/note/${uid}`);
    }

    return { notes, nickname, completed, uncompleted, toNoteLayout, getNotes, loading };
  }
});
</script>
