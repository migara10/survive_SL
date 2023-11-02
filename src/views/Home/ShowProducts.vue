<template>
  <div class="show-products">
    <section class="section-meals">
      <div class="container">
        <div class="meal" v-for="(item, index) in sortDataByPrice(items)" :key="index">
          <img :src="`${URL}/${item.image_path}`" class="meal-img" alt="item-image" />
          <div v-if="index == 0" class="triangle"></div>
          <div class="meal-content">
            <p class="meal-title">{{ item.description.toUpperCase() }}</p>
            <ul class="meal-attributes">
              <li class="meal-attribute">
                <ion-icon class="meal-icon" name="flame-outline"></ion-icon
                ><span><strong>{{ item.price }}</strong> per {{ item.unit }}</span>
              </li>
              <li class="meal-attribute">
                <ion-icon class="meal-icon" name="restaurant-outline"></ion-icon
                ><span>NutriScore &reg; <strong>74</strong></span>
              </li>
              <li class="meal-attribute">
                <ion-icon class="meal-icon" name="star-outline"></ion-icon
                ><span><strong>{{ item.shop }}</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import * as constants from '../../../constants'
export default {
  setup(props, { emit }) {
    const items = ref([])
    const URL = ref('')

    const childFunction = (product) => {
      console.log(product.text, 'Child function called from parent')
      axios
        .get('item/getProduct', { params: product.text })
        .then((res) => {
          items.value = res.data
          URL.value = constants.API_URL
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const sortDataByPrice = (item) => {
      item.sort((a, b) => a.price - b.price)
      return item
    }

    onMounted(() => {})

    return {
      childFunction,
      sortDataByPrice,
      items,
      URL
    }
  }
}
</script>

<style lang="scss" scoped>
.section-meals {
  padding: 24px 12px;
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .meal {
      flex: 50%;
      margin-bottom: 10px;
      box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
      border-radius: 11px;
      overflow: hidden;
      transition: all 0.4s;
      position: relative;
      .triangle {
        width: 0;
        height: 0;
        border-top: 100px solid red; /* Top border of the triangle (colored to create the triangle) */
        border-right: 100px solid transparent; /* Right border of the triangle */
        position: absolute; /* Position the triangle within the box */
        top: 0; /* Position it at the top */
        left: 0; /* Position it at the left */
        z-index: 1;
      }
      .triangle::before {
        content: 'Best Deal';
        position: absolute;
        top: -47px;
        left: 8px;
        color: rgb(255, 255, 255);
        transform-origin: top left;
        transform: rotate(-45deg); /* Rotate the text by 45 degrees */
        white-space: nowrap;
      }
      .meal-img {
        width: 100%;
        height: auto;
        object-fit: cover;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .meal-content {
        padding: 12px 24px;
        .meal-title {
          text-align: center;
          font-size: 1.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .meal-attributes {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          .meal-attribute {
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 1.6rem;
            .meal-icon {
              height: 2.4rem;
              width: 2.4rem;
              color: #e67e22;
            }
          }
        }
      }
    }
    .meal:hover {
      transform: translateY(-1.2rem);
      box-shadow: 0 3.2rem 6.4rem rgba(0, 0, 0, 0.06);
    }
  }
  @media only screen and (max-width: 600px) {
    .container {
      .meal {
        flex: 100%;
        .meal-img {
          height: 224.15px;
        }
        .meal-content {
          .meal-title {
          }

          .meal-attributes {
            .meal-attribute {
              .meal-icon {
              }
            }
          }
        }
      }
      .meal:hover {
        transform: translateY(-1.2rem);
        box-shadow: 0 3.2rem 6.4rem rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>

<!-- <template>
  <div>
    <p>Selected Category: {{ selectCategories }}</p>
  </div>
</template>

<script>
export default {
  props: {
    selectCategories: String // Define the prop and its type
  }
}
</script> -->
