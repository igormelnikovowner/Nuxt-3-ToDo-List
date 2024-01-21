<template>
  <div class="text-xl bg-white shadow-md rounded-md mb-4 pl-8 py-4 border-l-4" :class="borderColor">
    <TodoTitle :todo="note" :idx="idx" @show-dialog="showDialog"/>

    <div class="mt-4">
      <p :class="note.isDone ? 'text-emerald-500' : 'text-black'">{{ note.isDone ? '- Задачи которые вы победили! Грац.' :  '- Шаги для выпополнения задачи' }}</p>
      <div v-if="note.todos.length" class="flex justtify-between flex-wrap">
        <div v-for="todo, i in note.todos" :key="todo.uid" class="w-2/5 px-8 py-4">
          <TodoTitle :todo="todo" :idx="i + 1" type="todo" />
        </div>
      </div>
      <div v-else class="mt-4 font-bold text-2xl">
        {{ $t('Нет добавленных задач!') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
import type { PropType } from 'vue';
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
    TodoTitle,
  },
  emits: ['show-dialog'],
  setup(props, ctx) {
    const borderColor = computed<string>(
      () => props.note.todos.every((td) => td.isDone) ? 'border-emerald-500' : props.note.todos.some((td) => td.isDone) ? 'border-orange-200' : 'border-red-700',
    );

    const showDialog = (payload: { action: string, uid: number }) => {
      ctx.emit('show-dialog', payload);
    };

    return { borderColor, showDialog };
  }
});
</script>
