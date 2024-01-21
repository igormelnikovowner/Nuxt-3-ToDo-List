<template>
  <div class="flex justify-between align-center" :class="type === 'view' ? 'pr-8': ''">
    <div class="flex w-fit items-center">
      <span class="mr-2 truncate" :class="[todo.isDone && type === 'todo' ? 'line-through' : '', textColor]" style="max-width: 150px;">
        {{ `${idx}. ${todo.title}` }}
      </span>
      <Checkbox v-if="type === 'todo'" :modelValue="todo.isDone" :disable="true" type="checkbox"/>
    </div>

    <div v-if="type === 'view'" class="flex w-fit items-center">
      <div class="flex items-center cursor-pointer mr-4" @click="editNote">
        <span class="mr-1">
          Редактировать
        </span>
        <Icon icon="i-mdi-pencil-outline" />
      </div>
      <div class="flex items-center cursor-pointer" @click="deleteNote">
        <span class="mr-1">
          Удалить
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
      default: 'view'
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
  emits: ['show-dialog'],
  setup(props, ctx) {
    const textColor = computed<string>(
      () => props.todo.isDone ? 'text-emerald-500' : 'text-black',
    );

    const editNote = () => {
      navigateTo(`/note/${props.todo.uid}`);
    };

    const deleteNote = () => {
      ctx.emit('show-dialog', { action: 'delete', uid: props.todo.uid});
    };

    return { textColor, editNote, deleteNote };
  }
});
</script>
