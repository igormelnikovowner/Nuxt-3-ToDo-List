<template>
  <div class="w-full fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-10">
    <div class="w-2/3 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white m-auto z-20" style="max-width: 600px; min-width: 360px;">
      <div class="px-6 py-4">
        <div class="flex justify-between mb-4">
          <h2 class="font-bold text-3xl">Подвердите действие:</h2>
          <button @click="closeDialog">X</button>
        </div>
        <div class="text-xl mb-2">
          {{ $t(`${actionContent}`) }}
        </div>
        <div class="flex w-full justify-end">
          <Button class="text-white w-48 bg-gray-300 cursor-pointer mr-8" type="button" @click="closeDialog">
            {{ $t('Отменить') }}
          </Button>
          <Button class="text-white w-48 bg-red-500 cursor-pointer"  type="button" @click="confirmAction">
            {{ $t('Подвердить') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '~/components/basic/Button.vue';

export default defineComponent({
  name: 'Dialog',
  components: {
    Button,
  },
  props: {
    action: {
      type: String,
      default: 'delete',
    },
  },
  emits: ['close-dialog', 'confirm-action', 'confirm'],
  setup(props, ctx) {
    const actionContent = computed<string>(
      () => {
        if (props.action === 'delete') {
          return 'Удалить заметку?';
        }
        if (props.action === 'edit') {
          return 'Изменить заметку?';
        }
        if (props.action === 'delete-todo' || props.action === 'delete-new-todo') {
          return 'Удалить задачу?';
        }
        if (props.action === 'edit-todo' || props.action === 'edit-new-todo') {
          return 'Изменить задачу?';
        }
        return '';
      }
    )

    const confirmAction = () => {
      ctx.emit('confirm-action');
      if (props.action === 'delete-new-todo' || props.action === 'edit-new-todo') {
        confirm();
      }
    };

    const confirm = () => {
      ctx.emit('confirm');
    };

    const closeDialog = () => {
      ctx.emit('close-dialog');
    };

    return { actionContent, closeDialog, confirmAction };
  }
});
</script>
