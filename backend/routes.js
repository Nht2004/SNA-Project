const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all tasks
router.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD task
router.post("/tasks", (req, res) => {
  const { name, description, deadline, responsible } = req.body;

  const sql = `
    INSERT INTO tasks (name, description, deadline, responsible, status, note)
    VALUES (?, ?, ?, ?, 'Pending', '')
  `;

  db.query(sql, [name, description, deadline, responsible], (err, result) => {
    if (err) return res.json(err);
    res.json("Task added");
  });
});

// DELETE
router.delete("/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json("Deleted");
  });
});

// UPDATE
router.put("/tasks/:id", (req, res) => {
  const { name, description, deadline, responsible, status, note } = req.body;

  const sql = `
    UPDATE tasks
    SET name=?, description=?, deadline=?, responsible=?, status=?, note=?
    WHERE id=?
  `;

  db.query(sql, [name, description, deadline, responsible, status, note, req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json("Updated");
    });
});

module.exports = router;