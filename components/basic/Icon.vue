<template>
  <span :class="icon"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  }
});
</script>
