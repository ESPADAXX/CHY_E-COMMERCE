const express = require('express');
const crudFunctions = require('../controllers/crudPattern');

const createCRUDRouter = (model) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const data = await crudFunctions.find(model);
      res.json(data);
    } catch (error) {
      console.error('Error in getting all items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newItem = await crudFunctions.add(model, req.body);
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error in creating an item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
      await crudFunctions.remove(model, itemId);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error(`Error in deleting item with ID ${itemId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
      const updatedItem = await crudFunctions.update(model, itemId, req.body);
      res.json(updatedItem);
    } catch (error) {
      console.error(`Error in updating item with ID ${itemId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};

module.exports = createCRUDRouter;
