<template>
  <div id="app" :class="darkMode == true ? 'dark' : ''">
    <nav>
        <div class="title">
            <h1>To-do</h1>
        </div>
        <div class="darModeToggle">
            <label class="switch">
                <input type="checkbox" @click="toggleCheckbox" value="true">
                <div class="slider round"></div>
            </label>
        </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      darkMode: false
    }
  },
  updated() {
  },
  methods: {
    toggleCheckbox(){
      this.darkMode = !this.darkMode
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700&family=Nova+Flat&family=Tajawal:wght@200&display=swap');
#app {
  font-family: 'Cairo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>
