<template>
  <div>vue here</div>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <main>
    <RouterView />
  </main>

  <nav>
    <RouterLink to="/battles">battles</RouterLink>
  </nav>
</template>
