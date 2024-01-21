<template>
  <div class="w-full">
    <h2 class="font-bold text=2xl sm:text-4xl text-center mb-6 md:mb-12">
      Доброго времени суток, {{ nickname }}! {{ completed.length ? 'Ваши задачи:' : 'Добавьте новые задачи'}}
    </h2>
    <div v-if="completed.length || uncompleted.length" class="flex flex-col sm:flex-row w-full mb-8" :class="!uncompleted.length || !completed.length ? 'justify-center' : 'justify-around'">
      <template v-if="uncompleted.length">
        <div :class="!completed.length ? 'w-full sm:w-2/3' : 'w-full sm:w-2/5'">
          <div class="mb-4">
            <h3 class="font-bold text-lg sm:text-2xl text-center">
              <span class="border-b-2 border-black">
                Незавершенные задачи
              </span>
            </h3>
          </div>
          <div v-for="note, i in uncompleted" :key="note.uid">
            <UserNote :note="note" :idx="i + 1" @show-dialog="showDialog" />
          </div>
        </div>
      </template>

      <template v-if="completed.length">
        <div :class="!uncompleted.length ? 'w-full sm:w-2/3' : 'w-full sm:w-2/5'">
          <div class="mb-4">
            <h3 class="font-bold text-lg sm:text-2xl text-center">
              <span class="border-b-2 border-black">
                {{ $t('Выполненные задачи') }}
              </span>
            </h3>
          </div>
          <div v-for="note, i in completed" :key="note.uid">
            <UserNote :note="note" :idx="i + 1" @show-dialog="showDialog" />
          </div>
        </div>
      </template>
    </div>

    <div v-else-if="!isLoading">
      <h2 class="font-bold text-2xl text-center mb-12">
        {{ $t('Вы еще не добавили ни одной заметки(((') }}
      </h2>
    </div>

    <div v-else="isLoading">
      <h2 class="font-bold text-2xl text-center mb-12">
        {{ $t('Загружаем заметки...') }}
      </h2>
    </div>

    <div v-if="!isLoading" class="flex w-full justify-center">
      <Button class="bg-blue-500 text-white w-72" type="button" @click="toNoteLayout(new Date().getTime())">
        {{ $t('Добавить новую заметку') }}
      </Button>
    </div>
  </div>
  <Dialog v-if="isDialogOpen" :action="actionForConfirm" @close-dialog="closeDialog" @confirm-action="confirmAction('notes')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserNote from '../components/notes/UserNote.vue';
import Button from '../components/basic/Button.vue';
import Dialog from '../components/notes/Dialog.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    UserNote,
    Button,
    Dialog,
  },
  setup() {
    definePageMeta({
      layout: 'noteslayout',
    });
    const userStore = useUserStore();

    const { nickname, notes, isLoading } = storeToRefs(userStore);

    const completed = computed<INote[]>(
      () => notes.value.filter((n) => n.isDone),
    );
    const uncompleted = computed<INote[]>(
      () => notes.value.filter((n) => !n.isDone),
    );

    const toNoteLayout = (uid?: number) => {
      navigateTo(`/note/${uid}`);
    };

    const { isDialogOpen, actionForConfirm, showDialog, closeDialog, confirmAction } = useDialog();


    return { nickname, notes, completed, uncompleted, isLoading, toNoteLayout, showDialog, closeDialog, confirmAction, isDialogOpen, actionForConfirm };
  }
});
</script>
