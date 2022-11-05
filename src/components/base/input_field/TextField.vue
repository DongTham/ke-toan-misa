<template>
    <div class="field">
        <label for="">{{Label}}<span v-show="IsValidate" style="color:red;">&nbsp;*</span></label>
        <input class="field-normal" v-bind:class="Class" v-bind:type="Type" v-bind:placeholder="PlaceHolder">
    </div>
</template>
    
<script>
// import { ref } from '@vue/reactivity';

export default{
    name:"TextField",
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
        },
        IsValidate:{
            type:Boolean,
            default: false
        },
        PlaceHolder:{
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
@import url(../../../style/components/textfield.css);
</style>