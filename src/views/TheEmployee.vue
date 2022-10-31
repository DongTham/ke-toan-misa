<template>
    <input type="text" >
    </template>
      
    <script>
    import { ref } from '@vue/reactivity';
    
    export default{
        name:"TheContent",
        components:{},
        props: {
    
        },
        emits:[],
        setup() {
            const count = ref(0);
            return {
                count
            }
        },
        methods:{
    
        },
        data(){
            return{
                
            }
        },
        mounted() {
            console.log(this.count);
        }
    }
    </script>
    
    <style scoped>
    input{
        border-color: aqua;
    }
    </style>