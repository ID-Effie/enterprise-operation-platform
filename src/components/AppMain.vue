<!--
 * @Description: 只负责内容区容器。
      这样以后内容区样式、滚动、padding 都可以统一放在 AppMain 里。
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-28 21:32:33
-->
<template>
  <main class="app-content">
    <slot />
  </main>
</template>
