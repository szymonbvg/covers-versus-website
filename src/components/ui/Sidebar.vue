<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  height: 50%;
  flex-direction: column;
  border-top: 2px solid #1b1a18;
  background-color: #302e2d;
  overflow-y: auto;
}

@media screen and (min-width: 1100px) {
  .sidebar {
    height: 100% !important;
    max-width: 600px;
    width: 35%;
    border: 0;
    border-right: 10px solid #1b1a18;
  }
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin: 20px;
  padding: 0 10% 0 10%;
}
</style>
