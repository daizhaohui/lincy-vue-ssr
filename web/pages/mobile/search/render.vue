
<template>
  <div class="page-search">
    <div class="title">mobile search Page: {{ currentDate }}</div>
    <div>
      <van-search
        v-model:value="searchValue"
        placeholder="input search text"
        show-action
        @search="onSearch"
      />
    </div>
    <div class="search-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item.goodsName">
        <van-image
          width="8rem"
          height="8rem"
          fit="contain"
          :src="item.goodsCoverImg"
        />
        <div>
          {{ item.goodsIntro }}
        </div>
      </van-cell>
    </van-list>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less' scoped></style>
