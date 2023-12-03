import db from "../database/index.js";

function ModuleRoutes(app) {
  app.get("/api/modules", (req, res) => {
    res.send(db.modules);
  });
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;

    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });
  
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const module = req.body;

    db.modules = db.modules.map((m) => {
      if (m._id === mid) {
        return module;
      }
      return m;
    });

    // Send back the module so the react app can update it.
    res.send(module);
    res.sendStatus(204);
  });
}
export default ModuleRoutes;
