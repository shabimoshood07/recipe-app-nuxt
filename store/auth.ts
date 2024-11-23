import { defineStore } from "pinia";

export const useAuth = defineStore(
  "auth",
  () => {
    const isLoggedIn = ref(true);
    const showLoginModal = ref(false);
    const userDetails = ref<LoginResponse | null>(null);
    const searchLimit = ref(10);
    const searchSkip = ref(0);
    const searchText = ref("");
    const loginError = ref("");
    const handleLogin = ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      loginError.value = "";
      $fetch<LoginResponse>("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 360,
        }),
      })
        .then((res) => {
          userDetails.value = res;
          isLoggedIn.value = true;
          showLoginModal.value = false;
        })
        .catch(() => {
          loginError.value = "Login error";
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
      searchLimit,
      searchSkip,
      searchText,
      loginError,
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
