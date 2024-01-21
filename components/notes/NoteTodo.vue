<template>
  <div class="flex items-end mb-2 sm:mb-4">
    <div class="flex items-center sm:items-end mr-2 sm:mr-4 pb-2 sm:pb-0 ">
      <input v-model="model" :checked="model" type="checkbox" class="w-6 sm:w-10 h-6 sm:h-10" @input="changeTodoStatus" />
    </div>
    <FormGroup v-model="titlemodel" class="w-2/3 mr-2 sm:mr-4" type="text" label="Задача" placeholder="Введите название задачи" @update:modelValue="changeTodo" />
    <div v-if="type !== 'add' && reverseType" class="flex text-lg sm:text-xl font-bold cursor-pointer pt-3 sm:pt-5 mr-2 sm:mr-4 underline" @click="backToPrevState">
      <span v-if="reverseType === 'back'">
        {{ $t('Вернуть название Todo') }}
      </span>
      <span v-else>
        {{ $t('Отменить изменение Todo') }}
      </span>
    </div>
    <div class="flex text-lg sm:text-xl font-bold cursor-pointer pt-6 sm:pt-5"  @click="deleteTd">
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
    reverseType: {
      type: String,
      default: '',
    },
  },
  components: {
    FormGroup,
  },
  emits: ['change-todo-status', 'remove-todo', 'remove-new-todo', 'back-prev-state', 'change-todo'],
  setup(props, ctx) {
    const titlemodel = ref(props.todo.title);
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

    const changeTodo = () => {
      ctx.emit('change-todo', props.todo.title);
    };

    const backToPrevState = () => {
      ctx.emit('back-prev-state', { uid: props.noteUid, todo: props.todo.uid });
    };

    const deleteTd = () => {
      if (props.type !== 'add') {
        ctx.emit('remove-todo', { uid: props.todo.uid });
      } else {
        ctx.emit('remove-new-todo', { uid: props.todo.uid });
      }
    };

    return { titlemodel, model, changeTodoStatus, backToPrevState, deleteTd, changeTodo };
  }
});
</script>
