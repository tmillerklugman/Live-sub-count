<template>
  <main class = "container">
    <h1 class = "title"> Teaspill vs Keemstar</h1>
  <div class = "card-container">
   
      <!-- Keem-->
    <div class = "card">
      <img src = "https://yt3.ggpht.com/a-/AAuE7mAcW198VrHrQqGTGs5EEXx7-Tv-qtFpWky1og=s288-mo-c-c0xffffffff-rj-k-no"
       class = "channel_img" />
       <h2 class="card-title"> Keemstar</h2>
       <animated-number class = "number" 
       :value = "keemstarStats.subscriberCount" 
       :duration = "duration" 
       :formatvalue="formatCount"/>
    </div>

      <!-- teaspill-->
    <div class = "card">
      <img src = "https://yt3.ggpht.com/a-/AAuE7mBSCe0dyfD_my1vR012CJSTrMZTf9iEdseoGQ=s288-mo-c-c0xffffffff-rj-k-no"
       class = "channel_img" />
       <h2 class="card-title"> Teaspill </h2>
       <animated-number class = "number" 
       :value = "teaspillStats.subscriberCount" 
       :duration = "duration"
       :formatvalue="formatCount" />
    </div>
  </div>
    <div class = "difference">
       <animated-number 
       class = "number" 
       :value = "subDifference" 
       :duration = "duration"
       :formatvalue="formatCount" />
      <p stlyle="margin: 0"> Sub diff </p>
     </div>
     </main>
</template>

<script>

import io from 'socket.io-client'
import AnimatedNumber from 'animated-number-vue'

export default {
  components: { AnimatedNumber },
  data: () => ({
    keemstarStats: {},
    teaspillStats: {},
    duration: 1000
    
  }),
 async mounted() {

    const api_endpoint = 'http://localhost:4444/stats'
    const response = await fetch(api_endpoint)
    const {keemstarStats, teaspillStats} = await response.json()
    this.keemstarStats = keemstarStats
    this.teaspillStats = teaspillStats
   const socket = io("http://localhost:4444")
   socket.on("stats", ({keemstarStats, teaspillStats}) => {
    this.keemstarStats = keemstarStats
    this.teaspillStats = teaspillStats
   })
  },
   methods: {
    formatCount(value) {
      return Number(value.toFixed(0)).toLocaleString()
    }
  },
  computed: {
    subDifference() {
    return this.keemstarStats.subscriberCount - 
    this.teaspillStats.subscriberCount 
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html, body {
  font-family: 'Roboto', sans-serif;
  background: #070e15;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10vh 0;
}

.card-container {
  display: flex;
  margin-right: 5px;

}

.title {
  font-weight: 100;
  font-size: 50px;
  color: white;
  margin: 0;
}
.number {
  font-size: 40px;

}

.card-title {
  margin: 0;
  font-size: 40pxl
}
.channel_img {
  height: 120px;
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.card {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 400px;
  width: 400px;
  margin: 20px;
  background-color: aquamarine;
  border-radius: 10px;
}

.difference {
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  color: purple;
}
</style>