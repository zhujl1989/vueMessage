import Notice from '@/components/message'
class Message{
    constructor(){
        
    }
}
Message.install = function(Vue){
    Vue.prototype.$message = function(props){
        //挂载一个空组件
        let vm = new Vue({
            render:h=>h(Notice,{props})
        }).$mount()
        //挂载到body下        
        document.body.appendChild(vm.$el);
        //获取这个节点
        let docm = vm.$children[0];
        docm.remove = function(){
            //删除节点
            document.body.removeChild(docm);
            vm.$destroy()
        }
        return docm
    }
}
export default Message;