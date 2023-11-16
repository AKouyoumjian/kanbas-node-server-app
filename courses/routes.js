import Database from "../database/index.js";
function CourseRoutes(app) {
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString()};
    Database.courses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  app.get("/api/courses/:cid", (req, res) => {
    const { cid } = req.params;
    const course = Database.courses.find((c) => c._id === cid);
    res.send(course);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;

    Database.courses = Database.courses.map((c) => {
      if (c._id === course._id) {
        return course;
      }
      return c;
    });

    // Send back the course so the react app can update it
    res.send(course);
    res.sendStatus(204);
  });

}
export default CourseRoutes;