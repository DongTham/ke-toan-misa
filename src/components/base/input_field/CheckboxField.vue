<template>
    <div class="checkbox-field">
        <input class="field-normal" v-bind:class="Class" v-bind:type="Type">
        <span>{{Label}}</span>
    </div>
</template>
    
<script>

export default{
    name:"CheckboxField",
    components:{},
    props:{
        Label:{
            type:String,
            default:''
        },
        Type:{
            type:String,
            default:'text'
        },
        Class:{
            type:String,
            default:''
        } 
    },
    emits:[],
    setup() {
        
    },
    mounted() {
        
    }
}
</script>

<style scoped>
@import url(../../../style/components/checkboxfield.css);
</style>