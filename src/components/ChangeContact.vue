<template>
  <div
    class="modal fade"
    id="ChangeContactModel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ChangeContactModel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ChangeContactModel">
            Editar o contato
            <strong style="color: red">[{{ contact.nome }}]</strong>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click.prevent.stop="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="liveAlertPlaceholder">
            <div>
              <div
                class="alert alert-success alert-dismissible"
                v-if="userSave"
                role="alert"
              >
                {{ mensagem
                }}<button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="closeAlert"
                  @click.prevent="closeAlert"
                ></button>
              </div>
              <div
                class="alert alert-danger alert-dismissible"
                v-if="userSave === false"
                role="alert"
              >
                {{ mensagem
                }}<button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  @click.prevent="closeAlert"
                ></button>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="validationClass('nome')">
                <label for="recipient-name" class="col-form-label">Nome:</label>
                <input
                  type="text"
                  v-model.lazy="$v.nome.$model"
                  @change="$v.nome.$touch()"
                  class="form-control"
                  id="recipient-name"
                />
                <span
                  class="md-error"
                  :class="validationClass('nome')"
                  v-if="!$v.nome.required"
                  >O Campo nome e obrigatorio</span
                >
                <span
                  class="md-error"
                  :class="validationClass('nome')"
                  v-else-if="!$v.nome.minLength"
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
                  v-model.lazy="$v.telefone.$model"
                  @change="$v.nome.$touch()"
                  class="form-control"
                  id="telefone"
                  v-mask="'(##) ####-####'"
                />
                <span
                  class="md-error"
                  :class="validationClass('telefone')"
                  v-if="!$v.telefone.required"
                  >Preencha o Campo do telefone!</span
                >

                <span
                  class="md-error"
                  :class="validationClass('telefone')"
                  v-else-if="!$v.telefone.minLength"
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
            @click.prevent.stop="close"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent.stop="changeCont(contact)"
          >
            Editar Contato
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { mask } from "vue-the-mask";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ChangeContact",
  directives: { mask },
  mixins: [validationMixin],
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nome: "",
      telefone: "",
      userSave: null,
      mensagem: "",
    };
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3),
    },
    telefone: {
      required,
      minLength: minLength(14),
    },
  },
  methods: {
    changeCont(contact) {
      if (!this.$v.$invalid) {
        this.userSave = true;
        this.mensagem = "Contato alterado com sucesso!";

        this.$emit(
          "change-contact",
          { nome: this.nome, telefone: this.telefone },
          { ...contact }
        );

        setTimeout(() => {
          this.$v.$reset();
          (this.nome = ""), (this.telefone = "");
          this.close();
        }, 800);
      } else {
        this.mensagem = "Por favor preencha os dados corretamente!";
        this.userSave = false;
        setTimeout(() => {
          this.userSave = null;
        }, 8000);
      }
    },
    closeAlert() {
      this.userSave = null;
    },
    close() {
      const modal = document.querySelector("#ChangeContactModel");
      modal.removeAttribute("style");
      modal.classList.remove("show");
    },
    validationClass(className) {
      const field = this.$v[className];
      console.log(this.$v[className]);
      if (field) return { "md-invalid": field.$invalid && field.$dirty };
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