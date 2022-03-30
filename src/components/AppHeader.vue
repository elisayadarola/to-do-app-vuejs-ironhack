<template>
  //No usar este componente
  <div class="header">
    <h1>TaskAble</h1>
    <br />
    <p>Enabling procrastinators to get their sh*t together since 2022 👊🏿</p>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  color: rgb(226, 43, 195);
  font-size: 50px;
  font-weight: bold;
  background-image: url("../assets/0a8c982e9bcc4a49a049bfd8c681128c.png");
}
img {
  height: 200px;
  width: 200px;

  align-items: flex-start;
  margin-top: 0px;
}
</style>

 </div>
      <div class="w-full bg-gray-200 rounded-full mt-6 flex"> 
        <div class="bg-sky-600 text-xl font-medium text-white font-bold text-center p-2 leading-none rounded-full" :style="{width : progress() + '%'}">{{ progress() }}% completed</div>
      </div>
        <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 mt-6" @click="isCompleted = !isCompleted"> {{ isCompleted ? 'Show all' : 'Hide completed' }} </button>
        <h5 class="mt-6 text-slate-600 font-bold" v-if="datosTask.length === 0"> There are no tasks to be done</h5>