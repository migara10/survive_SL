<template>
  <div class="about">
    <div class="select-image">
      <div class="block1">
        <div class="show-image">
          <img :src="imageURL" alt="Selected Image" v-if="imageURL" />
        </div>
        <div class="upload-image">
          <input type="file" class="type" @change="onFileSelected" />
        </div>
      </div>
    </div>
    <div>
      <!-- product category -->
      <div class="select-category search-bar">
        <div class="custom-select">
          <input
            v-model="searchText"
            placeholder="Search Product Category"
            @click="showDropDown()"
            class="search-box"
          />
          <div class="options" :class="isOpen ? '' : 'd-none'">
            <div
              v-for="option in filterOptions"
              :key="option.id"
              class="dropdown_list"
              @click="selectOption(option)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- product name -->
      <div class="select-name default-input">
        <input
          type="text"
          class="search-box1"
          placeholder="Enter Product Name"
          v-model="productData.name"
        />
      </div>
      <!-- product price -->
      <div class="select-price default-input">
        <input
          type="text"
          class="search-box1"
          placeholder="Enter Product Price"
          v-model="productData.price"
        />
      </div>
      <!-- product description -->
      <div class="select-name default-input">
        <textarea
          class="search-box1 select-description"
          placeholder="Enter Product Description"
          v-model="productData.description"
        ></textarea>
      </div>
      <!-- supermarket name -->
      <div class="select-unit default-input">
        <div class="search-box2">
          <p>Select Supermarket</p>
          <label v-for="shop in shops" :key="shops.id" class="radio-style">
            <input
              type="radio"
              placeholder="Select Supermarket"
              v-model="productData.shop"
              :value="shop.text"
              :id="'shop_' + shop.id"
            />
            {{ shop.text }}
          </label>
        </div>
      </div>
      <!-- product unit -->
      <div class="select-unit default-input">
        <div class="search-box2">
          <p>Select Product Unit</p>
          <label v-for="unit in units" :key="unit.id" class="radio-style">
            <input
              type="radio"
              placeholder="Select unit"
              v-model="productData.unit"
              :value="unit.text"
              :id="'unit_' + unit.id"
            />
            {{ unit.text }}
          </label>
        </div>
      </div>
      <!-- upload button -->
      <div class="on-upload">
        <button class="" @click="onUpload()">Save Item</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

export default {
  setup(props, { emit }) {
    const selectImage = ref(null)
    const imageURL = ref(null)
    const allCategories = ref([])
    const searchText = ref('')

    const isOpen = ref(false)

    const productData = ref({
      category: '',
      name: '',
      description: '',
      unit: '',
      price: '',
      shop: '',
    })

    const units = ref([
      { id: 1, text: 'Liter' },
      { id: 2, text: 'Kilo' }
    ])
    const shops = ref([
      { id: 1, text: 'Lidl' },
      { id: 2, text: 'Prisma' },
      { id: 3, text: 'S-market' },

    ])

    const filterOptions = computed(() => {
      const filteredData = allCategories.value.filter((option) =>
        option.text.toLowerCase().includes(searchText.value.toLowerCase())
      )
      return filteredData
    })

    const onFileSelected = (event) => {
      selectImage.value = event.target.files[0]
      if (selectImage) {
        // Create a URL for the selected file
        imageURL.value = URL.createObjectURL(selectImage.value)
      } else {
        // Clear the image URL if no file is selected
        imageURL.value = null
      }
    }

    const onUpload = () => {
      productData.value.category = searchText.value
      const fd = new FormData()
      fd.append('file', selectImage.value)
      fd.append('category', productData.value.category)
      fd.append('name', productData.value.name)
      fd.append('description', productData.value.description)
      fd.append('unit', productData.value.unit)
      fd.append('price', productData.value.price)
      fd.append('shop', productData.value.shop)
      selectImage.value = null
      axios
        .post('item', fd)
        .then((res) => {})
        .catch((err) => {
          toast.error(err.response.data.msg, {
            timeout: 2000
          })
        })
    }

    const getAllCategories = () => {
      axios
        .get('item/getCategory')
        .then((res) => {
          allCategories.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const showDropDown = () => {
      searchText.value = ''
      isOpen.value = true
    }

    const selectOption = (option) => {
      emit('select', option)
      searchText.value = option.text // Set the search text to the selected option's text
      isOpen.value = false
    }

    onMounted(() => {
      $('.search-box').click(function () {
        $('.options').show()
      })
      $('html').click(function (event) {
        if (!$(event.target).is('.search-box')) {
          $('.options').hide()
        }
      })
      getAllCategories()
    })

    return {
      selectImage,
      allCategories,
      isOpen,
      onFileSelected,
      onUpload,
      getAllCategories,
      showDropDown,
      searchText,
      selectOption,
      productData,
      filterOptions,
      units,
      shops,
      imageURL
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
.about {
  .select-image {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    .block1 {
      width: 80%;
      .show-image {
        width: 300px;
        height: 300px;
        img{
          height: 100%;
          width: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      }
      .upload-image {
      }
      
    }
  }
  .search-bar {
    width: 100%;
    .custom-select {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
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
  .default-input {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-box1 {
      margin-top: 12px;
      height: 40px;
      box-shadow: none;
      outline: none;
      border: 1px solid green;
      padding: 12px;
      width: 80%;
      border-radius: 5px;
      align-items: center;
    }

    .search-box2 {
      margin-top: 12px;
      height: 40px;
      width: 80%;
      .radio-style {
        padding-right: 12px;
      }
    }
    .select-description{
      height: 80px;
      padding: 24px 12px;
    }
  }
  .on-upload {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 80%;
      margin-top: 24px;
      height: 35px;
      background-color: #52df2e;
      box-shadow: none;
      outline: none;
      border: none;
      border-radius: 5px;
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
