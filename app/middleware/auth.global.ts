import { useAuth } from "~~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const { getCurrentUserAuth } = useAuth();
  getCurrentUserAuth();
});
