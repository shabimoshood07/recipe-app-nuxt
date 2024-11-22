<script setup lang="ts">
import { useAuth } from "~~/store/auth";

const { userDetails, showLoginModal } = storeToRefs(useAuth());
const { handleLogout, handleLogin } = useAuth();
const sidebarVisible = ref(false);
</script>

<template>
  <header class="py-4 border-b sticky top-0 backdrop-blur-2xl">
    <nav class="flex container items-center justify-between">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <Icon
          name="arcticons:recipe-keeper"
          size="50"
          class="text-dodgroll-gold"
        />
        <span class="text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>

      <div v-if="userDetails" class="hidden md:flex items-center gap-2">
        <h1 class="capitalize font-bold">{{ userDetails.username }}</h1>
        <Avatar
          :image="userDetails.image"
          class="mr-2"
          size="normal"
          shape="circle"
        />
        <Button
          label="Logout"
          @click="handleLogout"
          class="bg-dodgroll-gold border-transparent hover:!bg-dodgroll-gold hover:!border-transparent"
        />
      </div>

      <ul
        class="md:flex gap-6 ml-auto text-xl font-bold capitalize hidden items-center"
        v-else
      >
        <li>
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <Button
          label="Login"
          @click="showLoginModal = true"
          class="bg-dodgroll-gold border-transparent hover:!bg-dodgroll-gold hover:!border-transparent"
        />
      </ul>

      <div class="card flex justify-center md:hidden">
        <Drawer v-model:visible="sidebarVisible">
          <template #container="{}">
            <div
              v-if="userDetails"
              class="flex flex-col items-start gap-10 mt-10 px-2"
            >
              <div class="flex items-center gap-2">
                <Avatar
                  :image="userDetails.image"
                  class="mr-2"
                  size="normal"
                  shape="circle"
                />
                <h1 class="capitalize font-bold">{{ userDetails.username }}</h1>
              </div>
              <Button
                label="Logout"
                @click="handleLogout"
                class="bg-dodgroll-gold border-transparent hover:!bg-dodgroll-gold hover:!border-transparent w-full"
              />
            </div>

            <ul
              class="flex flex-col gap-6 ml-auto text-xl font-bold capitalize items-start w-full mt-10 px-2"
              v-else
            >
              <Button
                label="Login"
                @click="showLoginModal = true"
                class="bg-dodgroll-gold border-transparent hover:!bg-dodgroll-gold hover:!border-transparent w-full"
              />
            </ul>
          </template>
        </Drawer>
        <Button
          icon="pi pi-arrow-right"
          @click="sidebarVisible = true"
          class="bg-transparent border-transparent hover:!bg-transparent !text-dodgroll-gold hover:!border-dodgroll-gold"
        />
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
