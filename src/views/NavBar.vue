<template>
  <section class="navigation">
    <div class="nav-container">
      <div class="brand">
        <a href="#!">Logo</a>
      </div>
      <nav>
        <div class="nav-mobile">
          <a id="navbar-toggle" href="#!"><span></span></a>
        </div>
        <ul class="nav-list">
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">About</a>
          </li>
          <li>
            <a href="#!">Services</a>
            <ul class="navbar-dropdown">
              <li>
                <a href="#!">Sass</a>
              </li>
              <li>
                <a href="#!">Less</a>
              </li>
              <li>
                <a href="#!">Stylus</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#!">Portfolio</a>
          </li>
          <li>
            <a href="#!">Category</a>
            <ul class="navbar-dropdown">
              <li>
                <a href="#!">Sass</a>
              </li>
              <li>
                <a href="#!">Less</a>
              </li>
              <li>
                <a href="#!">Stylus</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#!">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const navbarToggle = ref(null);
const navUl = ref(null);
const navItems = ref(null);
const navDropdowns = ref(null);

const toggleNav = () => {
  if (navUl.value.style.display === 'none' || navUl.value.style.display === '') {
    navUl.value.style.display = 'block';
  } else {
    navUl.value.style.display = 'none';
  }
};

const toggleHamburger = () => {
  navbarToggle.value.classList.toggle('active');
};

const toggleDropdown = (e) => {
  const clickedItem = e.target;
  const siblingDropdown = clickedItem.nextElementSibling;

  if (siblingDropdown) {
    if (siblingDropdown.style.display === 'none' || siblingDropdown.style.display === '') {
      siblingDropdown.style.display = 'block';
    } else {
      siblingDropdown.style.display = 'none';
    }

    navDropdowns.value.forEach((dropdown) => {
      if (dropdown !== siblingDropdown) {
        dropdown.style.display = 'none';
      }
    });

    e.stopPropagation();
  }
};

onMounted(() => {
  navbarToggle.value = document.getElementById('navbar-toggle');
  navUl.value = document.querySelector('nav ul');
  navItems.value = document.querySelectorAll('nav ul li > a:not(:only-child)');
  navDropdowns.value = document.querySelectorAll('.navbar-dropdown');

  navbarToggle.value.addEventListener('click', toggleNav);
  navbarToggle.value.addEventListener('click', toggleHamburger);
  navItems.value.forEach((item) => {
    item.addEventListener('click', toggleDropdown);
  });

  document.addEventListener('click', () => {
    navDropdowns.value.forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  });
});

onUnmounted(() => {
  navbarToggle.value.removeEventListener('click', toggleNav);
  navbarToggle.value.removeEventListener('click', toggleHamburger);
  navItems.value.forEach((item) => {
    item.removeEventListener('click', toggleDropdown);
  });

  document.removeEventListener('click', () => {
    navDropdowns.value.forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  });
});
</script> -->

<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  ;(function ($) {
    $(function () {
      //  open and close nav
      $('#navbar-toggle').click(function () {
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

      // Click outside the dropdown will remove the dropdown class
      $('html').click(function () {
        $('.navbar-dropdown').hide()
      })
    })
  })(jQuery)
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.navigation {
  height: 55px;
  background: linear-gradient(45deg, #4199fe, #74b4fe);
}
.brand {
  position: absolute;
  padding-left: 20px;
  float: left;
  line-height: 55px;
  text-transform: uppercase;
  font-size: 1.4em;
}
.brand a,
.brand a:visited {
  color: #ffffff;
  text-decoration: none;
}
.nav-container {
  max-width: 1000px;
  margin: 0 auto;
}
nav {
  float: right;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
nav ul li {
  float: left;
  position: relative;
}
nav ul li a,
nav ul li a:visited {
  display: block;
  padding: 0 20px;
  line-height: 55px;
  color: #fff;
  background: #262626;
  text-decoration: none;
}
nav ul li a {
  background: transparent;
  color: #fff;
}
nav ul li a:hover,
nav ul li a:visited:hover {
  background: #2581dc;
  color: #ffffff;
}
.navbar-dropdown li a {
  background: #2581dc;
}
nav ul li a:not(:only-child):after,
nav ul li a:visited:not(:only-child):after {
  padding-left: 4px;
  content: ' \025BE';
}
nav ul li ul li {
  min-width: 190px;
}
nav ul li ul li a {
  padding: 15px;
  line-height: 20px;
}
.navbar-dropdown {
  position: absolute;
  display: none;
  z-index: 1;
  background: #fff;
  box-shadow: 0 0 35px 0 rgba(0, 0, 0, 0.25);
}
/* Mobile navigation */
.nav-mobile {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  height: 55px;
  width: 70px;
}
@media only screen and (max-width: 800px) {
  .nav-mobile {
    display: block;
  }
  nav {
    width: 100%;
    padding: 55px 0 15px;
  }
  nav ul {
    display: none;
  }
  nav ul li {
    float: none;
  }
  nav ul li a {
    padding: 15px;
    line-height: 20px;
    background: #262626;
  }
  nav ul li ul li a {
    padding-left: 30px;
  }
  .navbar-dropdown {
    position: static;
  }
  @media screen and (min-width: 800px) {
    .nav-list {
      display: block !important;
    }
  }
  #navbar-toggle {
    position: absolute;
    left: 18px;
    top: 15px;
    cursor: pointer;
    padding: 10px 35px 16px 0px;
  }
  #navbar-toggle span,
  #navbar-toggle span:before,
  #navbar-toggle span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 3px;
    width: 30px;
    background: #ffffff;
    position: absolute;
    display: block;
    content: '';
    transition: all 300ms ease-in-out;
  }
  #navbar-toggle span:before {
    top: -10px;
  }
  #navbar-toggle span:after {
    bottom: -10px;
  }
  #navbar-toggle.active span {
    background-color: transparent;
  }
  #navbar-toggle.active span:before,
  #navbar-toggle.active span:after {
    top: 0;
  }
  #navbar-toggle.active span:before {
    transform: rotate(45deg);
  }
  #navbar-toggle.active span:after {
    transform: rotate(-45deg);
  }
}
</style>
