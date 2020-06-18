import store from '@/store/index'
class Plugin{
    
}
Plugin.install = function(Vue){   
    //上传图片
    Vue.prototype.$uploadFile = function(url,data){  
        return new Promise(resolve=>{
            let xmlHttp = new XMLHttpRequest();
           xmlHttp.open('post',url,true)          
            xmlHttp.onload = function(){              
                resolve(xmlHttp.responseText)
            }
           xmlHttp.setRequestHeader("token",Vue.cookie.get('token')); 
           xmlHttp.open("post",'http://localhost:4000/postImg',true); 
            xmlHttp.send(data)
        })
    }
}

export default Plugin;