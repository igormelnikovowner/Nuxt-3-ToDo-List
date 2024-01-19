<template>
  <input v-model="model" :checked="model" class="w-4" @input="changeInputValue" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Checkbox',
  props: {
    modelValue: {
      type:  Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const model = ref(props.modelValue);

    const changeInputValue = () => {
      ctx.emit('update:modelValue', model.value);
    }
    return { model, changeInputValue };
  }
});
</script>

