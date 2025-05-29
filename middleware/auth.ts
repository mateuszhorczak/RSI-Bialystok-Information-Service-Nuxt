export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (authStore.token) {
    const { data: isTokenExpired } = await useFetch<boolean>("/api/auth/token/expired", {
      method: "GET",
      query: { token: authStore.token },
      // @ts-ignore
      transform: ({ data }) => data,
    });

    if (isTokenExpired.value && to.path !== '/logout') {
      return navigateTo('/logout')
    }
  }

  if (!authStore.isLoggedIn && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }

  if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/')
  }
})
