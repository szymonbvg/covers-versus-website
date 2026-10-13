<template>
  <div class="loading">
    <img class="loading-icon" src="@/assets/loading.svg" />
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.loading-icon {
  height: 100%;
  will-change: filter;
}

@keyframes loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .loading-icon {
    animation: loading-spin infinite 0.9s linear;
  }
}
</style>
