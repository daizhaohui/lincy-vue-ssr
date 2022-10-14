
<template>
  <div class="page-search">
    <div>Search Page: {{ currentDate }}</div>
    <div>
      <a-input-search
        v-model:value="searchValue"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
    </div>
    <div class="search-list">
     <a-list item-layout="horizontal" :pagination="pagination" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.goodsIntro">
            <template #title>
              <div>{{ item.goodsName }}</div>
            </template>
            <template #avatar>
              <a-avatar :src="item.goodsCoverImg" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less' scoped></style>
