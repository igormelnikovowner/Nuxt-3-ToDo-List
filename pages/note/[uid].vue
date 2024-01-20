<template>
  <div class="w-full">
    <div class="flex flex-col items-center mb-12">
      <h2 class="font-bold text-4xl text-center mb-12">
        {{ type === 'add' ? $t('Заполните данные по новой заметке') : $t('Редактирование заметки')  }}
      </h2>

      <div class="w-3/5">
        <div class="flex items-end mb-4" >
          <FormGroup v-model="newNote.title" class="w-full mr-4" type="text" label="note" placeholder="Введите название заметки" />
          <div class="flex w-1/12 text-xl font-bold" :class="newTodo.title ? 'cursor-pointer' : 'cursor-not-allowed'" @click="editNote">
            <span>
              {{ $t('Изменить') }}
            </span>
          </div>
        </div>

        <div class="flex flex-col mb-8">
          <h3 class="w-full font-bold text-xl text-center">
            {{ newNote.todos.length ? $t('Задачи для выполнения') : $t('Нет добавленных задач')  }}
          </h3>
          <template v-for="t in newNote.todos" :key="t.uid">
            <div class="flex items-center mb-4">
              <FormGroup v-model="t.title" class="w-2/3 mr-4" type="text" label="todo" :disable="true" placeholder="Введите название задачи" />
              <Checkbox :model-value="t.isDone" type="checkbox" class="w-10 h-10 mt-5 mr-4" :disable="true" />
              <div class="flex text-xl font-bold cursor-pointer pt-5"  @click="editTodo">
                <span>
                  {{ $t('Изменить') }}
                </span>
              </div>
            </div>
          </template>
        </div>

        <h3 class="w-full font-bold text-xl text-center">
          {{ $t('Добавьте задачу') }}
        </h3>
        <div class="flex items-center">
          <FormGroup :model-value="newTodo.title" class="w-2/3 mr-4" type="text" label="newtodo" placeholder="Введите название задачи" @update:modelValue="changeNewTodoTitleValue" />
          <Checkbox :model-value="newTodo.isDone" type="checkbox" class="w-10 h-10 mr-4 mt-5" @update:modelValue="changeNewTodoCheckboxValue" />
          <div class="flex text-xl font-bold pt-5" :class="newTodo.title ? 'cursor-pointer' : 'cursor-not-allowed'" @click="addNewTodoToNote">
            <span>
              {{ $t('Добавить') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <Button class="bg-red-500 text-white w-72 mr-8" type="button" @click="toNotesLayout">
        {{ $t('Назад') }}
      </Button>
      <Button class="text-white w-72" :class="newNote.title && newNote.todos.length ? 'bg-emerald-500' : 'bg-gray-300 cursor-not-allowed'" type="button" @click="addNewNote">
        {{ $t('Сохранить') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormGroup from '~/components/auth/FormGroup.vue';
import Button from '~/components/basic/Button.vue';
import Checkbox from '~/components/basic/Checkbox.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    FormGroup,
    Button,
    Checkbox,
  },
  setup() {
    definePageMeta({
      layout: 'notelayout',
    });
    const route = useRoute();

    const userStore = useUserStore();
    const { addNote } = userStore;
    const { nickname, notes } = storeToRefs(userStore);

    const type = computed<string>(
      () => notes.value.some((n) => n.uid === +route.params.uid) ? 'edit' : 'add',
    );

    const note = ref(type.value === 'add' ? {} as INote : notes.value.find((n) => n.uid === +route.params.uid));

    const newNote = ref<INote>({
      uid: note.value?.uid || +route.params.uid,
      isDone: note.value?.isDone || false,
      title: note.value?.title || '',
      todos: note.value?.todos || [] as ITodo[],
    });

    const newTodo = ref<ITodo>({} as ITodo);

    const changeNewTodoCheckboxValue = (val: boolean) => {
      newTodo.value.isDone = val;
    };

    const changeNewTodoTitleValue = (val: string) => {
      newTodo.value.title = val;
    };

    const addNewTodoToNote = () => {
      if (newTodo.value.title) {
        newNote.value.todos.push({
        uid: new Date().getTime(),
        isDone: !!newTodo.value.isDone,
        title: newTodo.value.title,
        });
        newTodo.value.uid = 0;
        newTodo.value.isDone = false;
        newTodo.value.title = '';
      }
    };

    const editNote = () => {
      console.log('editNote');
    };
    const editTodo = () => {
      console.log('editTodo');
    };

    const addNewNote = () => {
      if (newNote.value.title && newNote.value.todos.length) {
        if (newNote.value.todos.every((t) => t.isDone)) {
          newNote.value.isDone = true;
        }
        addNote(newNote.value);
      }
    };

    const toNotesLayout = () => {
      navigateTo("/notes");
    };

    return { nickname, toNotesLayout, newNote, type, newTodo, changeNewTodoCheckboxValue, changeNewTodoTitleValue, addNewTodoToNote,
      editNote, editTodo, addNewNote };
  }
});
</script>

