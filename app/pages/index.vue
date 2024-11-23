<script setup lang="ts">
import { useAuth } from "~~/store/auth";

const { searchSkip, searchLimit, searchText } = storeToRefs(useAuth());

const { data, error } = await useFetch<RecipeResponse>(
  () =>
    // `https://dummyjson.com/recipes?limit=${searchLimit.value}&skip=${searchSkip.value}`,
    `https://dummyjson.com/recipes/search?q=${searchText.value}&limit=${searchLimit.value}&skip=${searchSkip.value}`,
  {
    watch: [searchLimit, searchSkip],
  }
);

const handleSearch = async () => {
  const { data } = await useFetch<RecipeResponse>(
    `https://dummyjson.com/recipes/search?q=${searchText.value}&limit=${searchLimit.value}&skip=${searchSkip.value}`
  );
  recipeList.value = data.value;
};

const handleClearSearch = async () => {
  searchText.value = "";
  handleSearch();
};
useSeoMeta({
  title: "Nuxtcipes",
  description: "Recipes for you to cook!",
  ogTitle: "Nuxtcipes",
  ogDescription: "Recipes for you to cook!",
  ogImage: "/nuxt-course-hero.png",
  ogUrl: `http:localhost:3000`,
  twitterTitle: "Nuxtcipes",
  twitterDescription: "Recipes for you to cook!",
  twitterImage: "nuxt-course-hero.png",
  twitterCard: "summary",
});

const recipeList = ref(data.value);
watch(data, (newData) => {
  recipeList.value = newData;
});
</script>

<template>
  <main>
    <section class="bg-[#f1f1f1]">
      <div
        class="container flex flex-col lg:flex-row items-center py-20 gap-10"
      >
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
            Master the Kitchen with Ease: Unleash Your Inner Chef Today!
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance">
            Discover recipes helping you to find the easiest way to cook.
          </p>
          <button
            class="px-4 py-2 text-white self-start bg-dodgroll-gold rounded-md text-lg cursor-pointer"
          >
            Browse Recipes
          </button>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg
            sizes="xs:100vw sm:667px"
            src="/nuxt-course-hero.png"
            format="webp"
            densities="x1"
            alt=""
          />
        </div>
      </div>
    </section>
    <section class="py-20 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>

      <div
        class="flex flex-col md:flex-row w-full max-w-[900px] mx-auto my-10 gap-5 items-center justify-center"
      >
        <div class="w-full relative">
          <InputText
            class="w-full focus-visible:!border-dodgroll-gold h-11 font-medium"
            v-model="searchText"
            :value="searchText"
          />
          <Icon
            name="material-symbols:cancel-outline"
            class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
            size="30"
            @click="handleClearSearch"
          />
        </div>
      </div>
      <div v-if="recipeList?.recipes.length == 0" class="my-20 w-full">
        <h1
          class="text-4xl font-bold text-dodgroll-gold capitalize text-center"
        >
          No recipe found!
        </h1>
      </div>
      <div
        v-if="!error"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
      >
        <!-- v-for="recipe in data?.recipes" -->
        <div
          v-for="recipe in recipeList?.recipes"
          class="flex flex-col shadow rounded-md"
        >
          <Recipecard :recipe="recipe" :key="recipe.id" />
        </div>
      </div>

      <p v-else class="text-xl">
        Opps, something went wrong. Please try again later
      </p>
      <div class="card" v-if="data && data.total">
        <Paginator
          :rows="searchLimit"
          :totalRecords="recipeList?.total"
          :rowsPerPageOptions="[10, 20, 30]"
          :pt="{
            page: {
              class:
                'bg-slate-200 border-transparent data-[p-active=true]:!bg-[#f79f1a] data-[p-active=true]:!text-slate-100',
            },

            current: {
              class: '[data-p-active=true]:bg-yellow-900',
            },
            pcRowPerPageDropdown: {
              root: {
                class:
                  'bg-slate-200 border-transparent focus-visible:border-red-500 hover:!border-[#f79f1a] ',
              },
              listcontainer: {
                class: 'text-base',
              },
              option: {
                class: 'text-base data-[p-selected=true]:!bg-[#f79f1a]/70',
              },
            },
          }"
          @page="
            (e) => {
              searchSkip = e.page * searchLimit;
            }
          "
          @update:rows="
            (e) => {
              searchLimit = e;
            }
          "
        />
      </div>
    </section>
  </main>
</template>
