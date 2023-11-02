<template>
  <div class="search-bar">
    <div class="custom-select">
      <input
        v-model="searchText"
        placeholder="Search..."
        @click="showDropDown()"
        class="search-box"
      />
      <div class="options" :class="isOpen ? '' : 'd-none'">
        <div
          v-for="option in filteredOptions"
          :key="option.id"
          class="dropdown_list"
          @click="selectOption(option)"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup(props, { emit }) {
    const searchText = ref('')
    const isOpen = ref(false)

    const options = ref([])

    // Filter options based on the search text
    const filteredOptions = computed(() => {
      const filteredData = options.value.filter((option) =>
        option.text.toLowerCase().includes(searchText.value.toLowerCase())
      )
      console.log(filteredData)
      return filteredData
    })

    // Emit the selected option
    const selectOption = (option) => {
      emit('select', option)
      searchText.value = option.text // Set the search text to the selected option's text
      isOpen.value = false
    }

    // Filter options when the search text changes
    const filterOptions = () => {
      getItemsData()
    }

    const showDropDown = () => {
      searchText.value = ''
      getItemsData()
      isOpen.value = true
    }

    /* onMounted(async () => {
      try {
        const response = await axios.get(apiUrl)
        responseData.value = response.data
        console.log(response.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }) */

    /* const getItemsData = async () => {
      try {
        const response = await axios.get('item/getOptions')
        options.value = response.data
      } catch (error) {
        // Handle any errors here
        console.error(error)
        throw error // Re-throw the error if needed
      }
    } */
    const getItemsData = () => {
      axios
        .get('item/getOptions')
        .then((res) => {
          options.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(async () => {
      $('html').click(function (event) {
        if (!$(event.target).is('.search-box')) {
          $('.options').hide()
        }
      })
      $('.search-box').click(function () {
        $('.options').show()
      })
    })

    return {
      searchText,
      filteredOptions,
      selectOption,
      filterOptions,
      showDropDown,
      isOpen,
      getItemsData,
      options
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  .custom-select {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 99;
    .search-box,
    .options {
      width: 80%;
      border-radius: 5px;
    }
    .search-box {
      margin-top: 12px;
      height: 40px;
      box-shadow: none;
      outline: none;
      border: 1px solid green;
      padding: 12px;
    }
    .options {
      position: absolute;
      top: 64px;
      max-height: 150px;
      overflow-y: auto;
      color: black;
      background-color: rgb(200, 214, 209);
      border: 1px solid rgb(200, 214, 209);
    }

    .dropdown_list {
      padding: 12px;
    }
    .dropdown_list:hover {
      background-color: #5bee4e; /* Change this color to your desired background color */
    }
  }
}
.d-none {
  display: none;
}
input,
select,
textarea {
  font-size: 16px; /* Adjust the font size as needed */
}
</style>
