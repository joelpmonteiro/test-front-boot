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
        <tr
          v-for="(value, index) in listContacts"
          :key="index"
          :class="value.telefone.substring(0, 4) === '(11)' ? 'ddd' : ''"
        >
          <th scope="row">{{ value.nome }}</th>
          <td>
            {{ value.telefone }}
          </td>
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
  computed: {
    checkDD: (index) => {
      console.log("ts", index.substring(0, 4));
      return index.substring(0, 4);
    },
  },
  methods: {
    contacts(contact) {
      this.listContacts.push({ ...contact });
      localStorage.setItem(`lista`, JSON.stringify(this.listContacts));
    },
    excluir(id) {
      this.$delete(this.listContacts, id);
      localStorage.setItem(`lista`, JSON.stringify(this.listContacts));
    },
    editar(newContact, oldContact) {
      this.listContacts.map((x) => {
        if (x.nome === oldContact.nome) {
          x.nome = newContact.nome;
          x.telefone = newContact.telefone;
        }
        return x;
      });
      localStorage.setItem(`lista`, JSON.stringify(this.listContacts));
    },
    OpenModalEditar(index) {
      const modal = document.querySelector("#ChangeContactModel");
      modal.setAttribute("style", "display:block;padding-right: 17px;");
      modal.classList.add("show");
      this.editContacts = this.listContacts[index];
      // this.$set(this.editContacts, 0, this.listContacts[index]);
    },
  },
  created() {
    // eslint-disable-next-line no-prototype-builtins
    if (localStorage.hasOwnProperty("lista")) {
      this.listContacts = JSON.parse(localStorage.getItem("lista"));
      console.log(`dados do localstorage: `, this.listContacts);
    }
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

.ddd {
  color: blue;
}
</style>
