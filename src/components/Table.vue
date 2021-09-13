<template>
  <div class="container">
    <add-contact @send-info="contacts" />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Telefone</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-if="listContacts.length > 0">
        <tr v-for="(value, index) in listContacts" :key="index">
          <th scope="row">{{ value.nome }}</th>
          <td>{{ value.telefone }}</td>
          <td>
            <input type="text" name="idArray" hidden="hidden" :value="index" />
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#ChangeContactModel"
              @click.prevent.stop="OpenModalEditar(index)"
            >
              editar
            </button>
            <change-contact @change-contact="editar" :contact="editContacts" />
            &nbsp;
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent.stop="excluir(index)"
            >
              excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import addContact from "./AddContact.vue";
import changeContact from "./ChangeContact.vue";
export default {
  name: "Table",
  components: {
    addContact,
    changeContact,
  },
  data() {
    return {
      listContacts: [],
      editContacts: {},
      indexID: null,
    };
  },
  methods: {
    contacts(contact) {
      this.listContacts.push({ ...contact });
    },
    excluir(id) {
      this.$delete(this.listContacts, id);
    },
    editar(newContact, oldContact) {
      // console.log("contato alterado: ", newContact);
      // console.log(`old: `, oldContact);

      this.listContacts.map((x) => {
        if (x.nome === oldContact.nome) {
          x.nome = newContact.nome;
          x.telefone = newContact.telefone;
        }
        return x;
      });
      console.log(`nova lista: `, this.listContacts);
    },
    OpenModalEditar(index) {
      const modal = document.querySelector("#ChangeContactModel");
      modal.setAttribute("style", "display:block;padding-right: 17px;");
      modal.classList.add("show");
      this.editContacts = this.listContacts[index];
      // this.$set(this.editContacts, 0, this.listContacts[index]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
