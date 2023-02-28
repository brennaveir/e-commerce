const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // finds all categories
try {
  const categoryData = await Category.findAll({
    // includes its associated Products
    include: [{ model: Product }], 
  })
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
  
});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //includes its associated Products
      include: [{ model: Product }],  
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
 
});

router.post('/', async (req, res) => {
  // creates a new category
try {
  const categoryData = await Category.create(req.body)
  res.status(200).json(categoryData);
} catch (err) {
  res.status(400).json(err)
}
});

router.put('/:id', async (req, res) => {
  // updates a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // deletes a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
