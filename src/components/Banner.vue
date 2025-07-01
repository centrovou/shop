<script setup>
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

// Отключаем стандартные стили navigation
import 'swiper/css/navigation';

const slides = [
  '../../public/banner/zxc.jpg',
  '../../public/banner/zxc.jpg',
  '../../public/banner/zxc.jpg',
];
const modules = [Navigation];
</script>

<template>
  <div class="swiper-container">
    <swiper
      class="swiper"
      :modules="modules"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      :slides-per-view="1"
      :space-between="0"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="slide" :alt="`Slide ${index + 1}`" class="slide-image" />
      </swiper-slide>

      <div class="custom-navigation">
        <button class="custom-prev">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <button class="custom-next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
}

.swiper {
  height: 300px;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* still castom */
.custom-navigation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  color: #333;
}

.custom-prev:hover,
.custom-next:hover {
  background: #f8f8f8;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.custom-prev:active,
.custom-next:active {
  transform: translateY(-50%) scale(0.95);
}

.custom-prev {
  left: 25px;
}

.custom-next {
  right: 25px;
}

/* скрытие стандартных стрелок */
.swiper-button-next,
.swiper-button-prev {
  display: none !important;
}

/* Анимация стрелок */
.custom-prev svg,
.custom-next svg {
  transition: transform 0.2s ease;
}

.custom-prev:hover svg {
  transform: translateX(-3px);
}

.custom-next:hover svg {
  transform: translateX(3px);
}
</style>
