# SN231 的文章杂烩 - 使用说明

这是一个已经配置好的中文个人文章站，使用 Eleventy + Vercel。

## 上传到 GitHub

把这个压缩包解压后，把里面的所有文件上传到 GitHub 仓库根目录。

注意：不要把外层文件夹整个上传。仓库首页应该直接看到：

- package.json
- vercel.json
- .eleventy.js
- src/

## Vercel 设置

Vercel 会自动读取 vercel.json：

- Build Command: npm run build
- Output Directory: _site

## 写新文章

在 `src/posts/` 新建 Markdown 文件，例如：

```md
---
layout: post.njk
title: "文章标题"
description: "文章摘要"
date: 2026-06-15
tags:
  - 学习经验
  - 随笔记录
---

正文写在这里。
```

保存并提交到 GitHub 后，Vercel 会自动部署。

## 修改站点名字

改这个文件：

`src/_data/site.json`
