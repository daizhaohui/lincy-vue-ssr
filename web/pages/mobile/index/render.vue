
<template>
  <div class="m-page-index">
    <div>Index Page Mobile</div>
    <div>
      <div class="btn-wrapper">
        <van-button type="primary" class="btn" @click="onAdd">Add</van-button>
        <van-button type="primary" class="btn" @click="onDelete">Delete</van-button>
      </div>
      <van-list>
        <van-cell v-for="item in hotGoodses" :key="item.goodsId">
          <div class="good-container vertical-center-flex">
            <img class="cover" :src="item.goodsCoverImg" />
            <div class="info">
              <div class="overflow-ellipsis name">{{ item.goodsName }}</div>
              <div class="overflow-ellipsis-3 desc">{{ item.goodsIntro }}</div>
              <div>{{ item.sellingPrice }}: {{ item.tag }}</div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less' scoped></style>
