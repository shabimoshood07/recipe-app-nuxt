import { defineStore } from "pinia";

export const useAuth = defineStore(
  "auth",
  () => {
    const isLoggedIn = ref(true);
    const showLoginModal = ref(false);
    const userDetails = ref<LoginResponse | null>(null);
    const handleLogin = ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      $fetch<LoginResponse>("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      })
        .then((res) => {
          userDetails.value = res;
          isLoggedIn.value = true;
          showLoginModal.value = false;
        })
        .catch((error) => {
          throw error;
        });
    };
    const handleLogout = () => {
      isLoggedIn.value = false;
      userDetails.value = null;
    };

    const getCurrentUserAuth = () => {
      if (!userDetails.value) return handleLogout();
      fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: userDetails.value.accessToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return handleLogout();
          }
        })
        .catch((error) => console.log(error));
    };

    return {
      isLoggedIn,
      handleLogin,
      showLoginModal,
      userDetails,
      handleLogout,
      getCurrentUserAuth,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      beforeHydrate: (ctx) => {
        console.log(`about to hydrate '${ctx.store.$id}'`);
      },
    },
  }
);
