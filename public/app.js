// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    set,
   onValue,remove,update
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPMnFOZf0WRtzuAbIacJgaG2e_xbYX8hQ",
    authDomain: "todoapp-997b8.firebaseapp.com",
    projectId: "todoapp-997b8",
    storageBucket: "todoapp-997b8.appspot.com",
    messagingSenderId: "82927673650",
    appId: "1:82927673650:web:1701adbbaee6d95b9fb72b",
    measurementId: "G-6H99SM0R1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()






var inp = document.getElementById('inp')
var list = document.getElementById('list')
var allData;
window.gettingData = function () {
    // let reference = ref(db)
   
    // get(child(reference, "todo/")).then((snapshot) => {
    //    allData=snapshot.val();
    //    console.log(Object.keys(allData).length);
    // }).catch((error) => {
    //     console.log(error)
    // }
    // )



    onValue(ref(db,"todo"),function(data){
       
        list.innerHTML=''
        data.forEach(function(Todos){
            console.log(Todos.val())
            var TodoLi =Todos.val().todo
            var TodoId =Todos.val().id
          
            if(TodoLi){
                list.innerHTML+=`
                <div style="display:flex;margin-bottom:5px;">
              
                <h4 style="width:50%" class="todotext">

               TODO : ${TodoLi}  </h4>
               <div style="width:50%">
               
               <button class="btn btn-outline-primary " onclick="edit('${TodoId}')"><i class="fa-solid fa-pen-to-square"></i><span class="btntext"> Edit </span></button>
               <button class="btn btn-outline-danger   " onclick="DeleteTodo('${TodoId}')"><i class="fa-solid fa-trash"></i><span class="btntext">Delete </span></button>
               <br/>
               </div>
                </div>
               `
                
            }
        else{
            list.innerHTML='No Todos are available.'
        }
        });
    
    })
}

gettingData();
window.addd = function () {
    var obj = {

        todo: inp.value,

    };
    obj.id = Math.random().toString().slice(2);
    console.log(obj.id);
    let reference = ref(db, `todo/${obj.id}/`)
    set(reference, obj);
    gettingData();
}

window.DeleteTodo=function(id){
    remove(ref(db,`todo/${id}`))
}
window.deleteall=function(){
    remove(ref(db,`todo`))
}

window.edit = function(id){
    var NewTodo = prompt(`EDIT TODO`)
   
    update(ref(db,`todo/${id}`),{
        todo:NewTodo
    })

}