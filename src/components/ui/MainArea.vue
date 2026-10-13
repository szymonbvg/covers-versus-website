<template>
  <div class="main-area">
    <slot />
  </div>
</template>

<style scoped>
.main-area {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@media screen and (max-width: 1100px) {
  .main-area {
    flex-direction: column-reverse !important;
  }
}
</style>
