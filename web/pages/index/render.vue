
<template>
  <div class="page-index">
    <div>Index Page</div>
    <div>
      <div class="btn-wrapper">
        <a-button type="primary" class="btn" @click="onAdd">Add</a-button>
        <a-button type="primary" class="btn" @click="onDelete">Delete</a-button>
      </div>
      <a-table :columns="columns" :dataSource="hotGoodses" rowKey="goodsId" bordered>
        <template #cover="{ record }">
          <img class="cover" :src="record.goodsCoverImg">
        </template>
      </a-table>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less' scoped></style>
