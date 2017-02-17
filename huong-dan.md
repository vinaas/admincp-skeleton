### Hướng dẫn thêm module

Bước 1: Tạo 1 file xxx.html nằm trong
```html
<template>
    content...
</template>
```

Bước 2 : Tạo 1 file xxx.ts
```javascript
export class Xxx {

}
```


Css cho module 

Thêm 1 file xxx.css sau đó import file css ở xxx.ts



Bước 3: Thêm cấu hình route cho module vừa Tạo (thêm vào menu bên tay trái)

```javascript
      { route: 'xxx', name: 'xxxname', moduleId: './xxx', nav: true, title: 'other module' }
```
`moduleId` là đường dẫn tới module trong thư mục src

`title` là hiển thị của menu

[tham khảo]()

### Thêm thư viện

khai báo trong dile /index.html 

### Bước tiếp

Hùng thêm 1 module chạy thử và publish