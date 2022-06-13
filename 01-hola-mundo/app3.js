console.log("Inicio de programa"); // 1

setTimeout(() => {
  console.log("primer timeout"); // 5
}, 3000);

setTimeout(() => {
  console.log("segundo timeout"); //3
}, 0);

setTimeout(() => {
  console.log("tercer timeout"); //4
}, 0);

console.log("Fin de programa"); //2
