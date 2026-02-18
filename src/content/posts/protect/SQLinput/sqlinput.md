---
title: SQL注入原理及防范措施
published: 2026-02-18
description: 如何防范SQL注入
tags: [SQL]
category: 后端
draft: false
---

## SQL注入原理
#### 以一个简单的例子分析SQL注入原理：

现在程序使用了一个SQL查询语句，比如：
```sql
SELECT * FROM users WHERE username = '${username}' LIMIT 1;
```
现在假设入侵者输入的username是：**'**,程序会直接报错，被发现以后知道这里有一个漏洞

现在入侵者就可以使用**SQL**语句为所欲为
例如，现在**SQL**语句变成了
```sql
SELECT * FROM users WHERE username = '1'; UPDATE users SET password = '123' WHERE username = 'MoScenix'; -- ' LIMIT 1;
```
后面内容被注释掉了，可怜的**MoScenix**的账号就被盗了

## SQL注入防范措施
#### 1. 使用参数化查询
参数化查询是指在SQL语句中使用参数占位符，而不是直接将用户输入拼接到SQL语句中。这样可以确保用户输入不会被解释为SQL代码，从而防止SQL注入攻击。

例如，使用**gorm**的参数化查询：
```go
db.Where("username = ?", username).First(&user)
```
在上面的代码中，`?`是参数占位符，`username`是参数值。这样可以确保用户输入不会被解释为SQL代码，从而防止SQL注入攻击。
#### 2. 输入验证和过滤
对用户输入进行验证和过滤是指在接收用户输入后，对其进行验证和过滤，确保其符合预期的格式和范围。例如，对用户名和密码进行验证，确保其只包含字母、数字和下划线，且长度在3到16个字符之间。

## 现状
上述原理虽然简单，但是在实际开发中，很多开发者仍然会忽略这个问题，导致SQL注入攻击。因此，使用参数化查询和输入验证和过滤是非常重要的。