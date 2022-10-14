
<template>
  <div class="page-header">
    <div class="left">Header: {{ currentDate }}</div>
    <div class="middle">
      <a-input
        v-model:value="value"
        placeholder="input search text"
      >
        <template #addonAfter>
          <a-button type="primary" @click="onSearchAfter(1)" style="margin-right: 10px;">客户端发起fetch</a-button>
          <a-button type="primary" @click="onSearchAfter(2)">服务端发起fetch</a-button>
        </template>
      </a-input>
    </div>
    <div class="right">{{ userName }}</div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less' scoped></style>
