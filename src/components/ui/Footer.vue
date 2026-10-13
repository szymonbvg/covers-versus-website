<template>
  <div class="footer">
    <div class="footer-info-container pointer" @click="showAbout = true">
      <img class="footer-img" src="@/assets/info.svg" />
      <span>About</span>
    </div>
    <div v-if="GITHUB_URL" class="footer-info-container pointer">
      <a class="github" :href="GITHUB_URL">
        <img class="footer-img" src="@/assets/github-logo.svg" />
        <span>GitHub</span>
      </a>
    </div>
    <div class="footer-info-container">
      <a :href="GAMEDLE_SUPPORT_URL">Support original Gamedle</a>
    </div>
    <div v-if="BUY_ME_A_BEER" class="footer-info-container">
      <a :href="BUY_ME_A_BEER">Buy Me A Beer</a>
    </div>
  </div>

  <div v-if="showAbout" class="overlay" @click="handleOverlayClick">
    <div class="about">
      <div class="titlebar">
        <div class="title">
          <p>About</p>
        </div>
        <img class="close" src="@/assets/close.svg" @click="handleOverlayClick" />
      </div>
      <div class="content">
        <span>
          Made by human (solo dev) for humans.<br />
          Yep this shitty non-intuitive design was made by me too.
        </span>
        <span>
          <strong>How to play?</strong><br />
          You have 4 attempts to guess the game from its cover.<br />
          Each wrong attempt costs 2 points from the available score.<br />
          Guessing the franchise, developer, publisher, release year, etc. earns bonus points.<br />
          If you guess the title after identifying any of these categories,<br />
          you lose 2 points for each category already guessed.
        </span>
        <span>
          <strong>About the project</strong><br />
          This is a spin-off of <a :href="GAMEDLE_URL">Gamedle</a> where you guess the game only by it's
          cover, have limited time to answer and can compete with your friends.<br />
          The game mainly relies on the Gamedle API, so if you enjoyed it, consider supporting the original
          creator (not me lol) so this side-project could work too.
        </span>
        <span>
          <a :href="GAMEDLE_SUPPORT_URL">Support original Gamedle here</a>
        </span>
        <span v-if="BUY_ME_A_BEER">
          If you somehow want to buy me a beer, you can do it <a :href="BUY_ME_A_BEER">here</a>
        </span>
        <span v-if="GITHUB_URL">
          <strong>Found some bugs? (there are probably a lot XD)</strong><br />
          Report them on <a :href="GITHUB_URL">GitHub</a>
        </span>
        <span v-if="MAIL">
          <strong>Contact</strong><br />
          <a :href="`mailto:${MAIL}`">{{ MAIL }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const GAMEDLE_URL: string = import.meta.env.VITE_GAMEDLE_URL ?? "https://gamedle.wtf";
const GAMEDLE_SUPPORT_URL: string = import.meta.env.VITE_GAMEDLE_SUPPORT_URL ?? "https://ko-fi.com/gamedle";
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const BUY_ME_A_BEER = import.meta.env.VITE_BUY_ME_A_BEER;
const MAIL = import.meta.env.VITE_MAIL;

const showAbout = ref(false);

const handleOverlayClick = (ev: MouseEvent) => {
  if (ev.target === ev.currentTarget) {
    showAbout.value = false;
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35px;
  background-color: #302e2d;
  border-top: 2px solid #1b1a18;
  padding: 0 15px;
  gap: 45px;
}

.footer-info-container,
.github {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.github {
  text-decoration: none;
  color: whitesmoke;
}

.pointer {
  cursor: pointer;
}

.overlay {
  z-index: 100;
}

.about {
  width: 70vw;
  max-width: 550px;
  height: 60vh;
  max-height: 600px;
  border: 1px solid #3f704d;
  border-radius: 8px;
  background-color: #43403e;
  box-shadow: 10px 10px #1b1a18;
  overflow: hidden;
}

.titlebar {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #302e2d;
}

.title {
  width: 100%;
  overflow: hidden;
  margin: 0 15px;
}
.title p {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about,
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  margin: 15px;
  gap: 15px;
  overflow-y: auto;
}

.footer-img {
  width: 22px;
}

.close {
  margin-left: auto;
  padding: 12px;
  background-color: #3f704d;
}
.close:hover {
  background-color: #568203;
}
.close:active {
  background-color: #74c365;
}
</style>
