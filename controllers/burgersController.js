const express = require('express');

const router = express.Router();

// Import model
const Burger = require('../models/Burger');

// Routes
router.get('/', (req, res) => {
    Burger.all((data) => {
      const hbsObject = {
        burgers: data,
      };
      res.render('index', hbsObject);
    });
  });

router.post('/api/burgers', (req, res) => {
  console.log(req.body);
  Burger.create(['name'], [req.body.name], (result) => {
    res.json({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    console.log('condition', condition);
  
    Burger.update(
      {
        devoured: req.body.devoured,
      },
      condition,
      (result) => {
        if (result.changedRows === 0) {
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  router.delete('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    Burger.delete(condition, (result) => {
      if (result.affectedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    });
  });

  // Export routes for server.js
  module.exports = router;