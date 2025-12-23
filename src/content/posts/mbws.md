---
title: Möbius Inversion
published: 2025-12-23
description: 莫比乌斯反演算法介绍
tags: [算法, Demo]
category: ACM
draft: false
---

### 狄利克雷卷积

设 $f,g$ 是两个算术函数 $(f:\mathbb{N}\to\mathbb{C})$，  
它们的 **狄利克雷卷积** 定义为一个新的算术函数 $(f*g)$：

$$
(f * g)(n)=\sum_{d\mid n} f(d)\, g\!\left(\frac{n}{d}\right)
$$

也可以写成对所有正整数对 $(a,b)$ 满足 $ab=n$ 的求和：

$$
(f * g)(n)=\sum_{ab=n} f(a)g(b)
$$

---

### 狄利克雷“前缀和”

普通前缀和是：

$$
S(n)=\sum_{k\le n} f(k)
$$

而这里考虑的是：

$$
F(n)=\sum_{d\mid n} f(d)
$$

对比一下：

| 普通前缀和 | 狄利克雷“前缀和” |
|-----------|----------------|
| 索引：$(k\le n)$ | 索引：$(d\mid n)$ |
| 按大小顺序 | 按整除关系 |
| 加法半群 | 乘法半群 |

给定算术函数 $f$，定义

$$
F(n)=\sum_{d\mid n} f(d)
$$

很多人会把它称为：

**<div align="center">$f$ 的狄利克雷前缀和</div>**

因为它等价于：

$$
F = f * 1
$$

即与 **常数函数 $1$** 做狄利克雷卷积。

---

### 逆元

所谓逆元，是指在一个**带有二元运算**的集合 $(S,\circ)$ 中，  
若某个元素 $b$ 能够“抵消”元素 $a$ 的作用，则称 $b$ 为 $a$ 的逆元。

---

#### 逆元的一般定义

在一个带有二元运算的集合 $(S,\circ)$ 中：

##### 1. 单位元

存在元素 $e\in S$，满足

$$
\forall a\in S,\quad a\circ e=e\circ a=a
$$

##### 2. 结合律

$$
a\circ(b\circ c)=(a\circ b)\circ c
$$

##### 3. 逆元

若对某个 $a\in S$，存在 $b\in S$ 使得

$$
a\circ b=b\circ a=e
$$

则称：

- $b$ 是 $a$ 的 **逆元**
- 记作 $b=a^{-1}$

逆元若存在，则是唯一的。

---

### 狄利克雷卷积的性质

#### 交换律

$$
(f * g)(n)
=\sum_{ab=n} f(a)g(b)
=\sum_{ba=n} f(b)g(a)
=(g * f)(n)
$$

#### 结合律

$$
(f * g) * h = f * (g * h)
$$

（证明可由对三元因子分解 $abc=n$ 的求和交换顺序得到。）

#### 单位元

定义函数

$$
\varepsilon(n)=
\begin{cases}
1,& n=1\\
0,& n>1
\end{cases}
$$

则有

$$
f * \varepsilon = \varepsilon * f = f
$$

---

### 莫比乌斯反演

#### 它要解决什么问题？

> 已知
> $$
> F(n)=\sum_{d\mid n} f(d)
> $$
> 能否从 $F(n)$ **反推出 $f(n)$**？

这正是 **莫比乌斯反演** 要解决的问题。

---

引入 **莫比乌斯函数**

$$
\mu(n)=
\begin{cases}
1,& n=1\\
(-1)^k,& n\text{ 是 }k\text{ 个不同素数的乘积}\\
0,& n\text{ 含有平方因子}
\end{cases}
$$

它满足：

$$
\sum_{d\mid n} \mu(d)=
\begin{cases}
1,& n=1\\
0,& n>1
\end{cases}
$$

这等价于：

$$
1 * \mu = \varepsilon
$$

因此，**$\mu$ 是常数函数 $1$ 在狄利克雷卷积下的逆元**。

---

#### 莫比乌斯反演公式

若

$$
F(n)=\sum_{d\mid n} f(d)
$$

则

$$
f(n)=\sum_{d\mid n} \mu(d)\,F\!\left(\frac{n}{d}\right)
$$

这就是 **莫比乌斯反演公式**。

从卷积角度看：

$$
F = f * 1
$$

两边同时与 $\mu$ 卷积，得到：

$$
f = F * \mu
$$
