const Tarea = require("../models/tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id) {
    delete this._listado[id];
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const { desc, completadoEn } = tarea;
      const posicion = `${index + 1}.`.green;
      const status = `${completadoEn ? "Completada".green : "Pendiente".red}`;
      console.log(`${posicion} ${desc} :: ${status}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    this.listadoArr
      .filter((tarea) => {
        return completadas ? tarea.completadoEn : tarea.completadoEn === null;
      })
      .forEach((tarea, index) => {
        const { desc, completadoEn } = tarea;
        const posicion = `${index + 1}.`.green;
        const status = completadoEn ? completadoEn.green : "Pendiente".red;
        console.log(`${posicion} ${desc} :: ${status}`);
      });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._listado[id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
