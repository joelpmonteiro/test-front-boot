<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-outline-primary btn-lg"
      data-toggle="modal"
      data-target="#addModel"
      @click.prevent.stop="modal"
    >
      ADICIONAR
    </button>
    <Modal
      :msg="mensagem.body"
      :title="mensagem.title"
      :userSave="userSave"
      v-if="save"
      @send-close="closeUserSave"
    />
    <div
      class="modal fade"
      id="addModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addModel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModel">Adicione Novo Contato</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click.prevent.stop="close(`addModel`)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form>
                <div class="form-group" :class="validationClass('nome')">
                  <label for="recipient-name" class="col-form-label"
                    >Nome:</label
                  >
                  <input
                    type="text"
                    v-model="$v.contact.nome.$model"
                    class="form-control"
                    @change="$v.contact.nome.$touch()"
                    id="recipient-name"
                    :disabled="save"
                  />
                  <span
                    class="md-error"
                    :class="validationClass('nome')"
                    v-if="!$v.contact.nome.required"
                    >O Campo nome e obrigatorio</span
                  >
                  <span
                    class="md-error"
                    :class="validationClass('nome')"
                    v-else-if="!$v.contact.nome.minLength"
                    >O total de caracteres para um nome aceitavel é no minimo: 3
                    caracteres</span
                  >
                </div>
                <div class="form-group" :class="validationClass('telefone')">
                  <label for="message-text" class="col-form-label"
                    >Telefone:</label
                  >
                  <input
                    type="tel"
                    v-model="$v.contact.telefone.$model"
                    class="form-control"
                    v-mask="'(##) ####-####'"
                    id="telefone"
                    :disabled="save"
                  />
                  <span
                    class="md-error"
                    :class="validationClass('telefone')"
                    v-if="!$v.contact.telefone.required"
                    >Preencha o Campo do telefone!</span
                  >

                  <span
                    class="md-error"
                    :class="validationClass('telefone')"
                    v-else-if="!$v.contact.telefone.minLength"
                    >Telefone Invalido</span
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.prevent.stop="close(`addModel`)"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent.stop="addContactList"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";
import { validationMixin } from "vuelidate";
import { mask } from "vue-the-mask";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  directives: { mask },
  components: {
    Modal,
  },
  mixins: [validationMixin],
  data() {
    return {
      contact: {
        nome: "",
        telefone: "",
      },
      save: false,
      userSave: false,
      mensagem: {
        body: "",
        title: "",
      },
    };
  },
  validations: {
    contact: {
      nome: {
        required,
        minLength: minLength(3),
      },
      telefone: {
        required,
        minLength: minLength(14),
      },
    },
  },
  methods: {
    closeUserSave(userSave, disabled) {
      this.userSave = userSave;
      this.save = disabled;
    },
    validationClass(className) {
      const field = this.$v.contact[className];
      if (field) return { "md-invalid": field.$invalid && field.$dirty };
    },
    modal() {
      const modal = document.querySelector("#addModel");
      modal.setAttribute("style", "display:block;padding-right: 17px;");
      modal.classList.add("show");
    },
    close(idModal) {
      if (idModal !== "") {
        const modal = document.querySelector(`#${idModal}`);
        modal.removeAttribute("style");
        modal.classList.remove("show");
      }
      this.$v.$reset();
      this.contact.nome = "";
      this.contact.telefone = "";
    },
    addContactList() {
      this.save = true;
      if (!this.$v.$invalid && !this.$v.$error && this.$v.$dirty) {
        if (this.contact !== null) {
          if (this.contact.nome !== "" && this.contact.telefone !== "") {
            this.$emit("send-info", this.contact);
            this.userSave = true;
            this.mensagem.title = "Sucesso para cadastrar o contato!";
            this.mensagem.body = "O contato foi salvo com sucesso!";
            setTimeout(() => {
              this.$v.$reset();
              //this.save = false;
              //this.userSave = false;
              this.close(`addModel`);
              this.contact.nome = "";
              this.contact.telefone = "";
            }, 650);
          }
        }
      } else {
        this.mensagem.title =
          "Erro, verifique se os campos foram todos preenchidos corretamente!";
        this.mensagem.body = "Por favor preencha os dados corretamente!";
        setTimeout(() => {
          this.close(`addModel`);
        }, 650);
      }
    },
  },
};
</script>
<style scoped>
.md-error {
  display: none;
}
.md-invalid {
  color: red;
  display: block !important;
}
</style>