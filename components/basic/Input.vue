<template>
  <input
    class="w-full border border-gray-200 rounded outline-none focus:ring focus:ring-purple-500 text-gray-600 transition-all duration-150 ease-in-out p-2"
    autocomplete="off"
    v-model="model"
    :disabled='disable'
    @input="changeInputValue"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: String || Number,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const model = ref(props.modelValue);
    watch(() => props.modelValue, () => {
      model.value = props.modelValue;
    });

    const changeInputValue = () => {
      ctx.emit('update:modelValue', model.value);
    }
    return { model, changeInputValue };
  }
});
</script>

