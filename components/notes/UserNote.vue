<template>
  <div class="text-xl bg-white shadow-md rounded-md mb-4 pl-8 py-4 border-l-4" :class="borderColor">
    <TodoTitle :todo="note" :idx="idx" />

    <div class="mt-4">
      <p :class="note.isDone ? 'text-emerald-500' : 'text-black'">{{ note.isDone ? '- Задачи которые вы победили! Грац.' :  '- Шаги для выпополнения задачи' }}</p>
      <div v-for="todo in note.todos" :key="todo.uid">
        <NoteTodo :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
import type { PropType } from 'vue';
import NoteTodo from '../components/notes/NoteTodo.vue';
import TodoTitle from './TodoTitle.vue';
import type { INote } from "~/stores/state";

export default defineComponent({
  name: 'UserNote',
  props: {
    note: {
      type: Object as PropType<INote>,
      default: {} as PropType<INote>,
    },
    idx: {
      type: Number,
      default: 1,
    },
  },
  components: {
    NoteTodo,
    TodoTitle,
  },
  setup(props) {
    const borderColor = computed<string>(
      () => props.note.todos.every((td) => td.isDone) ? 'border-emerald-500' : props.note.todos.some((td) => td.isDone) ? 'border-orange-200' : 'border-red-700',
    );

    return { borderColor };
  }
});
</script>
