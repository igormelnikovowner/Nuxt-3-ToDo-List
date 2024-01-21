<template>
  <input v-model="model" :checked="model" :disabled='disable' type="checkbox" class="w-4 h-4" @input="changeInputValue" />
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
      model.value = !model.value;
      ctx.emit('update:modelValue', model.value);
    }
    return { model, changeInputValue };
  }
});
</script>

