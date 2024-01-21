<template>
  <div class="flex items-end mb-4">
    <div class="flex items-end mr-4">
      <input v-model="model" :checked="model" type="checkbox" class="w-10 h-10" @input="changeTodoStatus" />
    </div>
    <FormGroup v-model="todo.title" class="w-2/3 mr-4" type="text" label="todo" placeholder="Введите название задачи" />
    <div v-if="type !== 'add'" class="flex text-xl font-bold cursor-pointer pt-5 mr-4" @click="editTd">
      <span>
        {{ $t('Изменить название Todo') }}
      </span>
    </div>
    <div class="flex text-xl font-bold cursor-pointer pt-5"  @click="deleteTd">
      <span>
        {{ $t('Удалить') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
import type { PropType } from 'vue';
import FormGroup from '../auth/FormGroup.vue';
import type { ITodo } from "~/stores/state";

export default defineComponent({
  name: 'NoteTodo',
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      default: {} as PropType<ITodo>,
    },
    noteUid: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'add',
    },
  },
  components: {
    FormGroup,
  },
  emits: ['change-todo-status', 'remove-todo', 'remove-new-todo', 'edit-new-todo', 'edit-todo'],
  setup(props, ctx) {
    const userStore = useUserStore();
    const { editTodo, deleteTodo } = userStore;

    const model = ref(props.todo.isDone);

    watch(() => props.todo, () => {
      model.value = props.todo.isDone
    }, { deep: true });

    const changeTodoStatus = () => {
      model.value = !model.value;
      if (props.type !== 'add') {
        const obj = { ...props.todo, isDone: model.value };
        editTodo(obj, props.noteUid);
      } else {
        ctx.emit('change-todo-status', { uid: props.todo.uid, val: model.value });
      }
    };

    const editTd = () => {
      console.log('editTodo', props.type);
      if (props.type !== 'add') {
        console.log('edit-todo');
        ctx.emit('edit-todo', { uid: props.todo.uid });
      } else {
        console.log('edit-new-todo');
        ctx.emit('edit-new-todo', { uid: props.todo.uid });
      }
    };

    const deleteTd = () => {
      if (props.type !== 'add') {
        ctx.emit('remove-todo', { uid: props.todo.uid });
      } else {
        ctx.emit('remove-new-todo', { uid: props.todo.uid });
      }
    };

    return { model, changeTodoStatus, editTd, deleteTd };
  }
});
</script>
