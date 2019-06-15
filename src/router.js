import Vue from "vue";
import Router from "vue-router";
var firebase = require("firebase/app")

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/Home.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("./views/Inventory.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/orders",
      name: "order",
      component: () => import("./views/Orders.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/rawMaterial",
      name: "rawMaterial",
      component: () => import("./views/RawMaterial.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/pendingCharges",
      name: "pendingCharges",
      component: () => import("./views/PendingCharges.vue"),
      meta: { requiresAuth: true}  
    },
    {
      path: "/productMade",
      name: 'productMade',
      component: () => import("./views/ProductMade.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/newUser",
      name: "newUser",
      component: () => import("./views/NewUser.vue"),
      meta: { requiresAuth: false}      
    },
    {
      path:"/notes",
      name: "notes",
      component: () => import("./views/Notes.vue"),
      meta: { requiresAuth: true}
    },
    {
      path: "/404",
      name: "404",
      component: () => import("./views/404.vue"),
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const protected_path = to.matched.some(record => record.meta.requiresAuth);
  var user = firebase.auth().currentUser;

  if(protected_path === true && user === null){
    next({name:'login'});
  }else{ next() }

})

export default router;