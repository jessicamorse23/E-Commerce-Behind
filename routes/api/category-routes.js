const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Module 13.7
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: product, 
      attibutes: ["id", "productName", "price", "stock", "categoryId"]
    }
  }).then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: "Category not found."});
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
      where: { 
        id: req.params.id
      },
      include: {
        model: Product, 
        attibutes: ["id", "productName", "price", "stock", "categoryId"]
      }
    }).then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: "Category not found."});
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  router.post('/seed', (req, res) => {
    Category.create({
      categoryName: req.body.categoryName
    }).then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
