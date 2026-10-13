<template>
  <div class="content-container">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
