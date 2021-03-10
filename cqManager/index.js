//1.导入模块
const express = require('express');
const dbHelper = require('./libs/dbHelper');

//导入文件上传的中间件
const multer  = require('multer')

//导入path
const path = require('path');

//导入body-parser
const bodyParser = require('body-parser')

//导入验证码
const svgCaptcha = require('svg-captcha');

//设置文件保存的地址
const upload = multer({ dest: 'views/imgs/' })

//导入cookie-session
var cookieSession = require('cookie-session')



//2.创建服务器
const app = express();

//注册cookie-session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

//用body-parser转换post的url,注册中间件
app.use(bodyParser.urlencoded({ extended: false }))

//3.托管静态资源
app.use(express.static('views'));

//登录的依据,session里面有username,所以自己写一个中间件,如果是以/hero开头的路由,必须得session里面有username才能访问
//不管访问哪个页面都会执行这个中间件
app.use((req,res,next)=>{
    // console.log(req.url);
    if(req.url.indexOf('/hero')!=-1){
        
        if(req.session.username){
            next();
        }else{
            res.send({
                msg:'请先登录',
                code:400
            })
        }
    }else{
        next();
    }
})

//4.创建路由
//4.1 创建英雄列表路由,有分页的
app.get('/herolist',(req,res) => {
    //4.1.1 查询的内容
    const query = req.query.query;
    //4.1.2 页码
    const pagenum = parseInt(req.query.pagenum);
    //4.1.3 页容量
    const pagesize = parseInt(req.query.pagesize);
    //4.1.4 获取数据库的所有数据
    dbHelper.find('cqlist',{},result=>{
        //倒序排列,只需要把找到的结果的数组翻转即可
        result = result.reverse();
        const temArr = result.filter(v=>{
            if(v.heroName.indexOf(query) != -1 || v.skillName.indexOf(query) != -1){
                return true;
            }
        })
        // res.send(temArr);
        //4.1.5 计算起始索引
        const startIndex = (pagenum-1) * pagesize;
        //4.1.6 计算结束索引
        const endIndex = startIndex+pagesize;
        //4.1.7 计算每页的数据
        let list = [];
        for(let i = startIndex;i<endIndex;i++){
            if(temArr[i]){
                list.push(temArr[i]);
            }
        }
        //4.1.8 计算总页数
        const totalPages = Math.ceil(temArr.length/pagesize);

        //4.1.9 返回数据
        res.send({
            totalPages,
            list
        })
    })

})

//4.2 创建英雄详情路由
app.get('/heroDetail',(req,res)=>{
    //4.2.1 获取id
    const id = req.query.id;
    //4.2.2 通过id查找
    dbHelper.find('cqlist',{_id:dbHelper.ObjectId(id)},result=>{
        res.send(result[0]);
    })
})

//4.3 新增英雄路由,参数:英雄名称,英雄头像,英雄技能,需要上传文件,用到multer中间件
app.post('/heroAdd',upload.single('heroIcon'),(req,res) =>{
    //4.3.1 可以获取到传过来的值
    const heroName = req.body.heroName;
    const skillName = req.body.skillName;
    console.log(req.session.username);

    //4.3.2 heroIcon是一个路径,但是req.file.path的路径有views,所以自己拼接,要存的是本地路径
    //views文件夹在托管静态资源的时候已经用到,直接可以访问到views里面的内容,所以heroIcon不用写views
    const heroIcon = path.join('imgs',req.file.filename);

    //4.3.3 存到数据库中
    dbHelper.insertOne('cqlist',{
        heroIcon,
        skillName,
        heroName
    },result=>{
       res.send({
           code:200,
           msg:"新增成功"
       })
    })
})

//4.4 修改英雄路由,参数:英雄名称,英雄头像,英雄技能,要修改的id
app.post('/heroUpdate',upload.single('heroIcon'),(req,res) =>{
    const heroName = req.body.heroName;
    const skillName = req.body.skillName;
    //有可能用户不修改英雄的图片,要判断一下,先把英雄的名称和技能存到对象中,如果修改了图片,就有req.file,再把图片加到update里面
    let update={
        heroName,
        skillName
    };
    if(req.file){
        const heroIcon = path.join('imgs',req.file.filename);
        update.heroIcon=heroIcon;
    }
    const id = req.body.id;

    dbHelper.updateOne('cqlist',{_id:dbHelper.ObjectId(id)},update,result=>{
        res.send({
            code:200,
            msg:"修改成功"
        });
    })
})

//4.5 删除英雄路由 参数:id
app.get('/heroDelete',(req,res) => {
    const id = req.query.id;
    
    dbHelper.deleteOne('cqlist',{_id:dbHelper.ObjectId(id)},result=>{
        res.send({
            msg:"删除成功",
            code:200
        });
    })
})

//4.6 用户注册的路由,参数 username  password
app.post('/register',(req,res) => {
    //4.6.1 获取username和password
    // res.send(req.body)
    //4.6.2 去数据库中查询是否有username
    dbHelper.find('userlist',{username:req.body.username},result=>{
        // res.send(result)
        //4.6.3 如果没有的话,会返回空数据,判断result数组的长度
        if(result.length==0){
            //4.6.4 没有这个用户名,往数据库里添加这个用户名
            dbHelper.insertOne('userlist',req.body,result=>{
                res.send({
                    msg:"恭喜你加入我们",
                    code:200
                })
            })
        }else{
            res.send({
                msg:"该用户名已被注册",
                code:400
            })
        }
    })
})

//4.7 验证码路由
app.get('/captcha', function (req, res) {
    //创建一个验证码的对象
    const captcha = svgCaptcha.create();
    //captcha.text就是验证码的内容,把验证码存到session里面
	req.session.vcode = captcha.text;
    console.log(captcha.text);
    //设置验证码格式
    res.type('svg');
    //结果返回给页面
	res.status(200).send(captcha.data);
});

//4.8 登录的路由
app.post('/login',(req,res)=>{
    //4.8.1 先判断验证码是否正确,把验证码存到session里面,取出和url进行判断
    const vcode =req.body.vcode;
    console.log(vcode);
    console.log(req.session.vcode);
    //把两个验证码都转换为小写,就不会区分大小写
    if(vcode.toLowerCase()==req.session.vcode.toLowerCase()){
        //4.8.2 判断username和password
        const username = req.body.username;
        const password = req.body.password;
        
        //4.8.3 去数据库里面查
        dbHelper.find('userlist',{username,password},result=>{
            if(result.length>0){
                //如果登录成功,把username存到session中
                req.session.username=username;
                res.send({
                    msg:"欢迎回来",
                    code:200,
                    username
                })
            }else{
                res.send({
                    msg:"用户名或密码错误",
                    code:400
                })
            }
        })
    }else{
        res.send({
            msg:"验证码不对哦",
            code:401
        })
    }

})

//4.9 登出的路由
app.get('/logout',(req,res) =>{
    //4.9.1 删除session
    req.session=null;
    // res.send(req.session);
    //4.9.2 跳转到login页面
    res.send({
        msg:"再见",
        code:200
    })
})

//5.服务器监听
app.listen(8848)