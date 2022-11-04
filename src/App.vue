<template>
  <div class="container">
    <the-sidebar></the-sidebar>
    <div class="content">
      <the-header></the-header>
      <the-content></the-content>
      <the-employee></the-employee>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheContent from './components/layout/TheContent.vue'
import TheEmployee from './views/TheEmployee.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar,
    TheContent,
    TheEmployee
  }
}
</script>

<style>
@import url(./style/main.css);
@import url(./style/components/button.css);
@import url(./style/components/function.css);
@import url(./style/components/table.css);
@import url(./style/components/scrollbar.css);
@import url(./style/components/dropdown.css);
</style>
