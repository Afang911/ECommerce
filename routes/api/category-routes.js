const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});
  


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [Product] });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category updated' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
