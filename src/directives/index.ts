/*
 * @Description:
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-30 19:14:11
 */
import type { App } from 'vue'
import { vPermission } from './permission'

export function setupDirectives(app: App) {
  app.directive('permission', vPermission)
}
