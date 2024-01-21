<template>
  <div v-if="!isLoading" class="w-full">
    <div class="flex flex-col items-center mb-6 sm:mb-12 border-2 border-white shadow-xl rounded-xl px-3 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <h2 class="font-bold text-2xl sm:text-4xl text-center mb-6 sm:mb-12">
        {{ type === 'add' ? $t('Заполните данные по новой заметке') : $t('Редактирование заметки')  }}
      </h2>

      <div class="w-full sm:w-3/5">
        <div class="flex items-end mb-2 sm:mb-4" >
          <FormGroup :model-value="newNote.title" class="w-full sm:mr-4" type="text" label="Заметка" placeholder="Введите название заметки" @update:modelValue="changeNewNoteTitleValue" />
          <div v-if="type !== 'add'" class="flex sm:w-1/12 text-lg sm:text-xl font-bold" :class="newNote.title ? 'cursor-pointer' : 'cursor-not-allowed'" @click="editNote">
            <span>
              {{ $t('Изменить') }}
            </span>
          </div>
        </div>

        <div class="flex flex-col mb-4 sm:mb-8">
          <h3 class="w-full font-bold text-lg sm:text-xl text-center">
            {{ newNote.todos && newNote.todos.length ? $t('Задачи для выполнения') : $t('Нет добавленных задач')  }}
          </h3>
          <template v-if="newNote.todos && newNote.todos.length">
            <NoteTodo
              v-for="t in newNote.todos"
              :key="t.uid"
              :note-uid="newNote.uid"
              :todo="t"
              :type="type"
              :reverse-type="reverseType"
              @change-todo-status="changeTodoStatus"
              @remove-todo="removeTodo"
              @remove-new-todo="removeNewTodo"
              @back-prev-state="backToPrevState"
              @change-todo="changeTodo"
            />
          </template>
        </div>

        <h3 class="w-full font-bold text-lg sm:text-xl text-center">
          {{ $t('Добавьте задачу') }}
        </h3>
        <div class="flex items-center sm:items-end">
          <FormGroup :model-value="newTodo.title" class="w-2/3 mr-2 sm:mr-4" type="text" label="Новая задача" placeholder="Введите название задачи" @update:modelValue="changeNewTodoTitleValue" />
          <div class="flex items-end mr-2 sm:mr-4 pt-7 sm:pt-0">
            <input v-model="newTodo.isDone" :checked="newTodo.isDone" type="checkbox" class="w-6 sm:w-10 h-6 sm:h-10" />
          </div>
          <div class="flex text-lg sm:text-xl font-bold sm:pt-8 pt-5" :class="newTodo.title ? 'cursor-pointer' : 'cursor-not-allowed'" @click="addNewTodoToNote">
            <span>
              {{ $t('Добавить') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center" :class="type === 'add' ? '' : 'flex-col sm:flex-row items-center'">
      <Button class="bg-gray-300 text-white w-60 sm:w-72 " :class="type !== 'add' ? 'mb-3 sm:mb-0 sm:mr-8' : 'mr-4 sm:mr-8'" type="button" @click="toNotesLayout">
        {{ $t('Назад') }}
      </Button>
      <Button v-if="type === 'add'" class="text-white w-60 sm:w-72" :class="newNote.title && newNote.todos.length ? 'bg-emerald-500' : 'bg-gray-300 cursor-not-allowed'" type="button" @click="addNewNote">
        {{ $t('Добавить заметку') }}
      </Button>
      <template v-else >
        <Button class="text-white bg-red-500 w-60 sm:w-72" :class="type !== 'add' ? 'mb-3 sm:mb-0 sm:mr-8' : 'mr-4 sm:mr-8'" type="button" @click="deleteNote">
          {{ $t('Удалить заметку') }}
        </Button>
        <Button class="text-white w-60 sm:w-72" :class="newNote.title && newNote.todos.length ? 'bg-emerald-500' : 'bg-gray-300 cursor-not-allowed'" type="button" @click="editNote">
          {{ $t('Сохранить изменения') }}
        </Button>
      </template>
    </div>
  </div>
  <div v-else="isLoading">
    <h2 class="font-bold text-2xl text-center mb-12">
      {{ $t('Загружаем заметки...') }}
    </h2>
  </div>
  <Dialog v-if="isDialogOpen" :action="actionForConfirm" @close-dialog="closeDialog" @confirm-action="confirmAction('note')" @confirm="confirm" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormGroup from '~/components/auth/FormGroup.vue';
import Button from '~/components/basic/Button.vue';
import Checkbox from '~/components/basic/Checkbox.vue';
import NoteTodo from '~/components/notes/NoteTodo.vue';
import Dialog from '../components/notes/Dialog.vue';
import { storeToRefs } from 'pinia';
import useDialog from "../../composables/useDialog";

export default defineComponent({
  components: {
    FormGroup,
    Button,
    Checkbox,
    NoteTodo,
    Dialog,
  },
  setup() {
    definePageMeta({
      layout: 'notelayout',
    });
    const route = useRoute();

    const userStore = useUserStore();
    const { addNote, editNote: edit } = userStore;
    const { notes, isLoading } = storeToRefs(userStore);

    const type = computed<string>(
      () => notes.value.some((n) => n.uid === +route.params.uid) ? 'edit' : 'add',
    );

    const note = computed<INote>(
      () => type.value === 'add' ? {} as INote : notes.value.find((n) => n.uid === +route.params.uid) || {} as INote,
    );

    watch(() => note.value, () => {
      newNote.value.uid = note.value.uid;
      newNote.value.isDone = note.value.isDone;
      newNote.value.title = note.value.title;
      newNote.value.todos = note.value.todos;
    }, { deep: true });

    const newNote = ref<INote>({
      uid: note.value?.uid || +route.params.uid,
      isDone: note.value?.isDone || false,
      title: note.value?.title || '',
      todos: note.value?.todos || [] as ITodo[],
    });

    const newTodo = reactive<ITodo>({} as ITodo);

    const changeTodoStatus = (payload: { uid: number, val: boolean }) => {
      const idx = newNote.value.todos.findIndex((t) => t.uid === payload.uid);
      newNote.value.todos[idx].isDone = payload.val;
    };

    const removeTodo = (payload: { uid: number }) => {
      showDialog({ action: 'delete-todo', uid: newNote.value.uid, todoUid: payload.uid });
    };

    const typeForNewTodoEdit = ref('');
    const payloadForNewTodoEdit = ref(null as unknown as number | string);
    const removeNewTodo = (payload: { uid: number }) => {
      typeForNewTodoEdit.value = 'delete-new-todo';
      payloadForNewTodoEdit.value = payload.uid;
      showDialog({ action: 'delete-new-todo', uid: newNote.value.uid, todoUid: payload.uid });
    };

    const confirm = () => {
      if (typeForNewTodoEdit.value === 'delete-new-todo') {
        newNote.value.todos = newNote.value.todos.filter((t) => t.uid !== payloadForNewTodoEdit.value);
      } else if (typeForNewTodoEdit.value === 'edit-new-todo') {
        newNote.value.title = payloadForNewTodoEdit.value as string;
      }
      typeForNewTodoEdit.value = '';
      payloadForNewTodoEdit.value = null as unknown as number | string
    }

    const changeNewTodoCheckboxValue = (val: boolean) => {
      newTodo.isDone = val;
    };

    const changeNewTodoTitleValue = (val: string) => {
      newTodo.title = val;
    };

    const changeNewNoteTitleValue = (val: string) => {
      newNote.value.title = val;
    };

    const addNewTodoToNote = () => {
      if (newTodo.title) {
        newNote.value.todos.push({
          uid: new Date().getTime(),
          isDone: !!newTodo.isDone,
          title: newTodo.title,
        });
        newTodo.uid = 0;
        newTodo.isDone = false;
        newTodo.title = '';
      }
    };

    const { isDialogOpen, actionForConfirm, showDialog, closeDialog, confirmAction, toNotesLayout } = useDialog();

    const editNote = () => {
      showDialog({ action: 'edit', uid: newNote.value.uid, title: newNote.value.title})
      reverseType.value = 'back';
    };
    const deleteNote = () => {
      showDialog({ action: 'delete', uid: newNote.value.uid })
    };
    const addNewNote = () => {
      if (newNote.value.title && newNote.value.todos.length) {
        if (newNote.value.todos.every((t) => t.isDone)) {
          newNote.value.isDone = true;
        }
        addNote(newNote.value);
        toNotesLayout();
      }
    };

    const reverseType = ref('');

    const prevState = ref('');

    const backToPrevState = (p: { uid: number, todo: number }) => {
      const note = notes.value.find((n) => n.uid === p.uid) || {} as INote;
      const idx = note.todos.findIndex((t) => t.uid === p.todo);
      const title = newNote.value.todos[idx].title;
      note.todos[idx].title = prevState.value;
      edit(note);
      reverseType.value = 'forward';
      prevState.value = title;
    };

    const changeTodo = (val: string) => {
      prevState.value = val;
    };

    return {
      isLoading, toNotesLayout, newNote, type, newTodo,
      changeTodoStatus, removeTodo, removeNewTodo, reverseType, backToPrevState, changeTodo,
      changeNewTodoCheckboxValue, changeNewTodoTitleValue, changeNewNoteTitleValue, addNewTodoToNote,
      editNote, deleteNote, addNewNote,
      isDialogOpen, actionForConfirm, closeDialog, confirmAction,
      confirm,
    };
  }
});
</script>

