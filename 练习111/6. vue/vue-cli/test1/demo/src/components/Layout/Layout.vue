<template>
  <div class="layout-container">
      <!--左边-->
      <div class="layout-left">
          <slot name="layout-left"></slot>
      </div>
       <!--中间-->
        <div class="layout-center">
            <slot name="layout-center"></slot>
        </div>
        <!--右边-->
        <div class="layout-right">
            <slot name="layout-right"></slot>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>


</style>