import db from "../database/index.js";

function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    res.send(db.assignments);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;

    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = req.body;

    db.assignments = db.assignments.map((a) => {
      if (a._id === aid) {
        return assignment;
      }
      return a;
    });

    // Send back the assignment so the React app can update it
    res.send(assignment);
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
