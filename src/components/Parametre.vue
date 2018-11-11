<template>
    <div>
        <Sidebar/>
        <div style="margin-left:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
           T'es dans parametre et c'est ce que je dois modifié
        </button> -->
            

            <div>
                <input class="w3-check" type="checkbox">
                <label>Action</label>
                <input class="w3-check" type="checkbox">
                <label>Biopic</label>
                <input class="w3-check" type="checkbox">
                <label>Comedy</label>
                <input class="w3-check" type="checkbox">
                <label>Guerre</label>
            </div>
            <div>
                <input class="w3-check" type="checkbox">
                <label>Action1</label>
                <input class="w3-check" type="checkbox">
                <label>Biopic1</label>
                <input class="w3-check" type="checkbox">
                <label>Comedy1</label>
                <input class="w3-check" type="checkbox">
                <label>Guerre1</label>
            </div>
            <div>
                <input class="w3-check" type="checkbox">
                <label>Action2</label>
                <input class="w3-check" type="checkbox">
                <label>Biopic2</label>
                <input class="w3-check" type="checkbox">
                <label>Comedy2</label>
                <input class="w3-check" type="checkbox">
                <label>Guerre2</label>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "./SideBar";
export default {
    components: {Sidebar}
}
</script>
