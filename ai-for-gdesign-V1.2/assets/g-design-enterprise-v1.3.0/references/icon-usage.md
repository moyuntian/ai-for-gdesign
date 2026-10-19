# 离线图标使用规范

- 统一使用GIcon，不直接写内联SVG。
- 默认尺寸20px，常用尺寸16、20、24、32px；默认线宽2。
- 颜色使用currentColor或G Design语义Token。
- 有独立含义的图标必须提供label；装饰图标保持aria-hidden。
- 业务代码优先用稳定英文名；AI生成原型可以使用中文别名。
- 品牌Logo不纳入通用图标资产。
- 完整SVG位于assets/icons/lucide/icons，运行与构建均不请求外网。
