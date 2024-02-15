import axios from 'axios';

// import store from "../store/index";
export default (await import('vue')).defineComponent({
components: {
Card,
},
data() {
return {
tareas: {
id: "",
nombre: "",
descripcion: "",
},
};
},
methods: {
async getTasks() {

const url = "http://localhost:8080/api/tareas";
const res = await axios.get(url);
console.log(res);

},
},
});
