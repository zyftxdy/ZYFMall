import axios from 'axios'

export function request(config){

        const instance = axios.create({
            baseURL:'http://123.207.32.32:8000/api/v1',
            timeout:5000
        });

        //拦截器
        //1.请求拦截
        instance.interceptors.request.use(config =>{
            //console.log(config); 
            return config
        },err =>{
            console.log(err); 
        });
        //2.响应拦截
        instance.interceptors.response.use(res =>{
            //console.log(res);
            return res.data
        },err =>{
            console.log(err)
        })

        return instance(config)   
      
}