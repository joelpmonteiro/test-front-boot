<template>
  <div
    class="modal fade"
    id="completeRegister"
    tabindex="-1"
    role="dialog"
    aria-labelledby="completeRegister"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="completeRegister">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-success" v-if="userSave" role="alert">
            {{ msg }}
          </div>
          <div class="alert alert-danger" v-else role="alert">
            {{ msg }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click.prevent="close(`completeRegister`)"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { modal } from "../assets/services.js";
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userSave: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close(id) {
      this.$emit("send-close", false, false);
      modal(id);
    },
  },
  mounted() {
    console.log("test: ", this.userSave);
    const modal = document.querySelector("#completeRegister");
    modal.setAttribute("style", "display:block;padding-right: 17px;");
    modal.classList.add("show");
  },
};
</script>