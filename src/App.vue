<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './views/navBar.vue'
</script> -->

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <NavBar />

  <RouterView class="pppp"/>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { onMounted, ref } from 'vue'

onMounted(() => {
  ;(function ($) {
    $(function () {
      //  open and close nav
      /* $('#navbar-toggle').click(function () {
        $('nav ul').slideToggle()
      })

      // Hamburger toggle
      $('#navbar-toggle').on('click', function () {
        this.classList.toggle('active')
      })

      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function (e) {
        $(this).siblings('.navbar-dropdown').slideToggle('slow')

        // Close dropdown when select another dropdown
        $('.navbar-dropdown').not($(this).siblings()).hide('slow')
        e.stopPropagation()
      })
 */
      // Click outside the dropdown will remove the dropdown class
      /* $('.pppp').click(function () {
      }) */
    })
  })(jQuery)
})
</script>

<style scoped></style>
