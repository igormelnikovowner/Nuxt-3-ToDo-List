<template>
  <div class="px-8 py-4">
    <TodoTitle :todo="todo" type="todo" />
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
import type { PropType } from 'vue';
import TodoTitle from './TodoTitle.vue';
import type { ITodo } from "~/stores/state";

export default defineComponent({
  name: 'NoteTodo',
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      default: {} as PropType<ITodo>,
    },
  },
  components: {
    TodoTitle,
  },
  setup() {
    return {};
  }
});
</script>
