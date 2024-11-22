<script setup>
import { useAuth } from "~~/store/auth";

const { handleLogin } = useAuth();
const { showLoginModal } = storeToRefs(useAuth());
const username = ref("");
const password = ref("");
</script>

<template>
  <div class="card flex justify-center">
    <!-- <Button label="Show" @click="visible = true" /> -->
    <!-- v-model:visible="visible" -->
    <Dialog
      v-model:visible="showLoginModal"
      modal
      header="Login"
      :style="{ width: '25rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <InputText
          id="username"
          class="flex-auto focus-visible:!border-dodgroll-gold"
          autocomplete="off"
          v-model="username"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="password" class="font-semibold w-24">Password</label>
        <InputText
          id="password"
          class="flex-auto focus-visible:!border-dodgroll-gold"
          autocomplete="off"
          type="password"
          v-model="password"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          class="bg-transparent text-slate-900 border-dodgroll-gold hover:!shadow-2xl hover:!bg-transparent hover:!border-dodgroll-gold hover:!text-slate-900"
          @click="showLoginModal = false"
        ></Button>
        <Button
          type="button"
          label="Login"
          @click="handleLogin({ username, password })"
          class="bg-dodgroll-gold border-transparent hover:!shadow-2xl hover:!bg-dodgroll-gold hover:!border-dodgroll-gold hover:!text-slate-900"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>
