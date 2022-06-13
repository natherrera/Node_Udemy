require("colors");
const {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/CRUD_DB");

const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    console.clear();
    //Imprimir el menú
    opt = await inquireMenu();

    switch (opt) {
      case "1": // Crear tareas
        console.clear();
        const desc = await leerInput("Ingrese descripción de la tarea: ");
        tareas.crearTarea(desc);
        break;

      case "2": // Listar tareas
        console.clear();
        tareas.listadoCompleto();
        break;
      case "3": // Listar completadas
        console.clear();
        tareas.listarPendientesCompletadas();
        break;
      case "4": // Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": // Completar tareas
        console.clear();
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log({ ids });
        break;
      case "6": // Borrar tareas
        console.clear();
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro que desea borrar la tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada".red);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
