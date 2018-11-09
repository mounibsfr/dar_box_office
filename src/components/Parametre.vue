<template>
    <div>
        <Sidebar/>
        <div style="margin-left:25%"/>
        <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
           T'es dans parametre et c'est ce que je dois modifié
        </button>
    </div>
</template>

<script>
import Sidebar from "./SideBar";
export default {
    components: {Sidebar}
}
</script>
