const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all tasks
router.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ GET task by ID (THÊM MỚI - cần cho edit)
router.get("/tasks/:id", (req, res) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result[0]); // trả về 1 object
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
    if (err) return res.status(500).json(err);
    res.json({ message: "Task added", id: result.insertId });
  });
});

// DELETE
router.delete("/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

// ✅ UPDATE (fix nhẹ để phù hợp FE)
router.put("/tasks/:id", (req, res) => {
  const { name, description, deadline, responsible, status, note } = req.body;

  const sql = `
    UPDATE tasks
    SET 
      name=?,
      description=?,
      deadline=?,
      responsible=?,
      status=?,
      note=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name || "",
      description || "",
      deadline || null,
      responsible || "",
      status || "Pending",
      note || "",
      req.params.id
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

module.exports = router;