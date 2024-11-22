<script setup lang="ts"></script>

<template>
  <header class="py-4 border-b sticky top-0 backdrop-blur-2xl">
    <nav class="flex container items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <Icon
          name="arcticons:recipe-keeper"
          size="50"
          class="text-dodgroll-gold"
        />
        <span class="text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>
      <ul class="md:flex gap-6 ml-auto text-xl font-bold capitalize hidden ">
        <li >
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <!-- <li>
          <NuxtLink to="/about"> About </NuxtLink>
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<style scoped></style>
