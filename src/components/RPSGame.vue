<template>
    <div class="bg-gray-800 text-gray-100 text-center min-h-screen flex flex-col">
      <header class="container mx-auto p-6">
      <div v-if="!elementalMode"  class="text-4xl font-bold flex gap-3 justify-center">
        <p class="text-pink-500">Rock</p><p>-</p><p class="text-green-500">Paper</p><p>-</p><p class="text-blue-500">Scissors</p>
      </div>
      <div v-else class="text-4xl font-bold flex gap-3 justify-center">
        <p class="text-red-500">Fire</p><p>-</p><p class="text-sky-500">Water</p><p>-</p><p class="text-green-500">Leaf</p>
      </div>
      
      <p v-if="choice == null" class="text-3xl font-bold">Choose your fighter</p>    
      </header>
      <main class="container mx-auto p-6 flex-1">
        <div v-if="choice == null" class="flex items-center justify-center mx-6">
    
          <button v-if="!elementalMode" @click="moves('rock')"
            class="bg-white rounded-full shadow-lg w-64 md:p-12 p-4 mx-1 md:mx-6 
            transition duration-300 hover:bg-sky-500 hover:scale-150 delay-100">
            <img src="../assets/Rock.png" class="w-full">
          </button>
          <button v-else @click="moves('rock')"
            class="bg-white rounded-full shadow-lg w-64 md:p-12 p-4 mx-1 md:mx-6 
            transition duration-300 hover:bg-green-500 hover:scale-150 delay-100">
            <img src="../assets/Fire.png" class="w-full">
          </button>
          
          <button  
            @click="moves('paper')"
            class="bg-white rounded-full shadow-lg w-64 md:p-12 p-4 mx-1 md:mx-6 
            transition duration-300 hover:bg-pink-500 hover:scale-150 delay-100">
            <img v-if="!elementalMode" src="../assets/Paper.png" class="w-full">
            <img v-else src="../assets/Water.png" class="w-full">
          </button>
    
    
          <button v-if="!elementalMode"
            @click="moves('scissors')"
            class="bg-white rounded-full shadow-lg w-64 md:p-12 p-4 mx-1 md:mx-6 
            transition duration-300 hover:bg-green-500 hover:scale-150 delay-100">
            <img v-if="!elementalMode" src="../assets/Scissor.png" class="w-full">
          </button>
          <button v-else
            @click="moves('scissors')"
            class="bg-white rounded-full shadow-lg w-64 md:h-80 h-30 md:p-12 p-2 mx-1 md:mx-6 
            transition duration-300 hover:bg-sky-500 hover:scale-150 delay-100">
            <img src="../assets/Leaf.png" class="w-full">
          </button>
        </div>
    
        <div v-else>
          <div class="text-3xl mb-4">
            You used <span class="text-orange-500">{{ choice }}</span> 
            <b class="flex items-center justify-center">VS</b> 
            Computer used <span class="text-purple-500">{{ computerChoice }}</span>
          </div>
          <div class="text-3xl md:text-6xl mb-12 font-bold">
            {{ resultTxt }}
          </div>
          <button @click="ResetRound" class="bg-pink-500 w-2/5 md:w-1/5 text-lg py-2 px-4 rounded-full">Again</button>
        </div>
        <div class="mt-12 text-3xl mb-4">
          {{ wins }}W : {{ draws }}D : {{ losses }}L
        </div>
        <div class="text-lg">
          Win rate: {{ Math.round(calcWinPercentage) }}%
        </div>
      </main>
      
      <button v-if="!elementalMode" class="bg-white w-2/5 md:w-1/5 text-lg py-2 px-4 rounded-full text-gray-800 hover:bg-gray-100" @click="ToggleButton">Elemental mode</button>
    <button v-else class="bg-white w-2/5 md:w-1/5 text-lg py-2 px-4 rounded-full text-gray-800 hover:bg-gray-100" @click="ToggleButton">Default mode</button>
    
    </div>
    </template>
    
    <script setup>
    import {ref, computed, onMounted } from 'vue';
    
    var elementalMode = ref(false);
    
    const wins = ref(0)
    const losses = ref(0)
    const draws = ref(0)
    
    const choice = ref(null)
    const computerChoice = ref(null)
    const resultTxt = ref(null)
    
    const outcomes = {
      rock: {
        rock: "draw",
        paper: "lose",
        scissors: "win"
      },
      paper: {
        rock: "win",
        paper: "draw",
        scissors: "lose"
      },  
      scissors: {
        rock: "lose",
        paper: "win",
        scissors: "draw"
      }
    }
    const SaveGame = () => {
        localStorage.setItem("wins", wins.value)
        localStorage.setItem("losses", losses.value)
        localStorage.setItem("draws", draws.value)  
      }
    
    const moves = c => {
      const choices = ["rock", "paper", "scissors"];
      const random = Math.floor(Math.random() * choices.length);
    
      choice.value = c;
      computerChoice.value = choices[random];
    
      const outcome = outcomes[c][computerChoice.value];
      switch(outcome){
        case "win":
          wins.value++
          resultTxt.value = "You won jippie!";
          SaveGame();
          break;
    
          case "lose":
            losses.value++
            resultTxt.value = "You lose hahaha!";
            SaveGame();
            break;
    
          case "draw":
            draws.value++
            resultTxt.value = "No one wins...";
            SaveGame();
            break;
      }
    
      if(elementalMode.value){
        switch(choice.value){
          case "rock":
            choice.value = "fire";
            break;
          case "paper":
            choice.value = "water";
            break;
    
          case "scissors":
            choice.value = "leaf";
            break;
        }  
    
        switch(computerChoice.value){
          case "rock":
          computerChoice.value = "fire";
            break;
          case "paper":
          computerChoice.value = "water";
            break;
    
          case "scissors":
          computerChoice.value = "leaf";
            break;
        }    
      }
    
    }
    
      const LoadGame = () =>{
        wins.value = parseInt(localStorage.getItem("wins") || 0);
        losses.value = parseInt(localStorage.getItem("losses") || 0);
        draws.value = parseInt(localStorage.getItem("draws") || 0);
    
      }
      const calcWinPercentage = computed(()=>{
        const total = wins.value + losses.value + draws.value;
        //set wins to 0 by default
        return total ? (wins.value / total) * 100 : 0
      })
      const ResetRound = () =>{
        choice.value = null;
        computerChoice.value = null;
        resultTxt.value = null;
      }
      
      onMounted(()=>{
        LoadGame();
      })
      const ToggleButton = () =>{
        elementalMode.value = !elementalMode.value
      }
      
    </script>