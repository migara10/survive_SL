<template>
  <div class="custom-select">
    <input v-model="searchText" @input="filterOptions" placeholder="Search...">
    <div class="options">
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        @click="selectOption(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    options: Array, // Array of options for the select menu
  },
  setup(props, { emit }) {
    const searchText = ref('');
    
    // Filter options based on the search text
    const filteredOptions = computed(() => {
      return props.options.filter(option =>
        option.text.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    // Emit the selected option
    const selectOption = option => {
      emit('select', option);
      searchText.value = ''; // Clear the search box
    };

    // Filter options when the search text changes
    const filterOptions = () => {
      // This will be triggered when the user types in the search box
    };

    return {
      searchText,
      filteredOptions,
      selectOption,
      filterOptions,
    };
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
}

.options {
  position: absolute;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
}
</style>
