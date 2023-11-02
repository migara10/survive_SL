<template>
  <div>
    <div @click="openSearchBar()">
      <custom-select @select="onSelectOption" />
    </div>
    <div>
      <show-product ref="childRef" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomSelect from './CustomSelect.vue';
import ShowProduct from './ShowProducts.vue';

export default {
  components: {
    CustomSelect,
    ShowProduct
  },
  setup() {
    const selectCategory = ref('');
    const childRef = ref(null);

    const callChildFunction = (product) => {
      if (childRef.value) {
        childRef.value.childFunction(product);
      }
    };

    const onSelectOption = (option) => {
      selectCategory.value = option;
      callChildFunction(selectCategory.value);
    };

    const openSearchBar = () => {
      console.log('openSearchBar');
    };

    return {
      selectCategory,
      onSelectOption,
      openSearchBar,
      childRef,
      callChildFunction,
    };
  }
}
</script>



<style></style>

<!-- <template>
  <div>migara 1234</div>
  <div>
    <custom-select :options="options" @select="onSelectOption" />
  </div>
</template>

<script>
import { ref, inject, onBeforeMount } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import CustomSelect from '../components/CustomSelect.vue';


const $loading = useLoading({})

const fullPage = ref(false)

const submit = () => {
  const loader = $loading.show({})
  setTimeout(() => {
    loader.hide()
  }, 5000)
}

onBeforeMount(() => {
  console.log('hii')
  const loader = $loading.show()
  setTimeout(() => {
    loader.hide()
  }, 2000)
})
</script>
 -->
