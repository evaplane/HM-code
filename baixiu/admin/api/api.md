### 判断用户名和密码是否在数据库的接口
type:post

data:
    email:邮箱
    password:密码

url:doLogin.php

dataType:json

响应体:

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}



## 判断是否已经登录的接口

type:get

data:没有

url:checkLogin.php

dataType:json

响应体:

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}


## 获取用户信息的接口

type:get

data:没有

dataType:json

url:doUserInfo.php

响应体:

    对象
    {"id":1,"slug":admin,......}


## 获取网站资源统计数据的接口

type:get

data:没有

dataType:json

url:doWebInfo.php

响应体:

    对象
    {"wenzhang":100,"pinglun",100.....}


## 获取分页评论的数据的接口

type:get

url: api/getComments.php

data: 
    pageIndex 页码
    pageSize 页容量

dataType: json

响应体:

    {
        data:
        [
            {}.
            {}.
            {}
        ],
        totalPages:

    }


## 修改评论状态的接口
 type: post

 url:api/editComments.php

 data:
    status:告诉我要修改成什么状态
    ids:告诉我修改了哪些数据

        如果单行只传一个值,如果多行就穿多个id
        ids的取值要么是"3"这样的,要么是"3,9,10,11"这样的

响应体:
    JSON

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}


## 获取文章的接口
type:get

url:api/getPosts.php

data:
        pageIndex 页码
        pageSize  页容量

响应体:

    json

    {
        data:数据
        totalPages:总页数
    }

## 获取分类的接口

type:get

url:api.getCategory.php

data:无

响应体:
    json

    $data:获取所有分类

## 文章页面删除操作的接口

type:get

url:api/deletePost.php

data: 
    ids  要删除的数据的id

dataType: json

响应体:

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}

## 文章加到数据库的接口

type:post

url:api/addPosts.php

typeData: json

data:
    slug
    title
    feature
    created
    content
    status
    category

响应体:

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}

## 根据id获取文章

type:get

typeData:json

data:id

url:api/getPostById.php

响应体:

    $data[0] {}


## 根据id修改文章

type: post

url:api/updatePost.php

data:
    slug
    title
    feature
    created
    content
    status
    category
    id

响应体:

    JSON
   
    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"}

## 修改用户信息的接口

type:post 

url:api/editUser.php

data:
    email
    slug
    nickname
    bio
    avatar

dataType:json

响应体:

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 


## 修改密码的接口

type:post 

url:api/changePassword.php

data:
    oldPass  旧密码  
    newPass  新密码

响应体
    json

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 


## 删除分类的接口

type:get 

url:api/deleteCategory.php

data:ids

响应体:

    json


    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 


## 新增分类

type:post

url:api/addCategory.php

data:
    slug
    name

响应体:
    json

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 

## 修改分类的接口

type:post 
url:api/editCategory.php

data:
    slug
    name
    id

响应体:
    json

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 

## 获取轮播图数据的接口

url:api/getSlides.php

data:无

type:get

响应体:

    json

    [
        {},
        {},
        {}.....
    ]

## 新增轮播图数据的接口

url:api/addSlider.php

data: 
    image
    link
    text

type:post

响应体:

        json

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 

## 删除轮播图数据的接口
type:get

data: 
    ids
url:api/deleteSlider.php

响应体:
        json

    {"code":10000,"msg":"ok"}
    或者
    {"code":10001,"msg":"fail"} 


