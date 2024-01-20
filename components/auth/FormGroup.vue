<template>
  <div class="flex flex-col space-y-2">
      <Label>{{ label }}</Label>
      <Input :model-value="modelValue" :type="type" :placeholder="placeholder" :disable="disable" @update:modelValue="changeInputValue"/>
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../basic/Input.vue';
import Label from '../basic/Label.vue';

export default defineComponent({
  name: 'FormGroup',
  props: {
    modelValue: {
      type: String || Number,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Input,
    Label,
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const changeInputValue = (value: String | Number) => {
      ctx.emit('update:modelValue', value)
    };
    return { changeInputValue };
  }
});
</script>
