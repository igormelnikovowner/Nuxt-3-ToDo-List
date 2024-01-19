<template>
  <div class="flex justify-between align-center" :class="type === 'note' ? 'pr-8': ''">
    <div class="flex w-fit align-center">
      <span class="mr-2" :class="[todo.isDone && type === 'todo' ? 'line-through' : '', textColor]">
        {{ `${type === 'todo' ? todo.uid : idx}. ${todo.title}` }}
      </span>
      <Checkbox v-if="type === 'todo'" :modelValue="todo.isDone" type="checkbox" @update:modelValue="changeInputValue"/>
    </div>

    <div class="flex w-fit align-center">
      <div class="flex items-center cursor-pointer mr-4">
        <span class="mr-1">
          Edit
        </span>
        <Icon icon="i-mdi-pencil-outline" />
      </div>
      <div class="flex items-center cursor-pointer">
        <span class="mr-1">
          Delete
        </span>
        <Icon icon="i-mdi-delete-outline" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
import type { PropType } from 'vue';
import Icon from '../basic/Icon.vue';
import Checkbox from '../basic/Checkbox.vue';
import type { ITodo, INote } from "~/stores/state";

export default defineComponent({
  name: 'TodoTitle',
  props: {
    todo: {
      type: Object as PropType<ITodo | INote>,
      default: {} as PropType<ITodo | INote>,
    },
    type: {
      type: String,
      default: 'note'
    },
    idx: {
      type: Number,
      default: 1,
    },
  },
  components: {
    Icon,
    Checkbox,
  },
  setup(props) {
    const changeInputValue = (val: boolean) => {
      console.log('val', val);
    };

    const textColor = computed<string>(
      () => props.todo.isDone ? 'text-emerald-500' : 'text-black',
    );

    return { changeInputValue, textColor };
  }
});
</script>
