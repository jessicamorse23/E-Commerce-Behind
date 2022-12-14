const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// Module 13 - 7&8
// I worked with a tutor - Patrick Meehan - to fix and debug this code. We went over it line by line. 
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name'],
    },
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((dbDataReturns) => {
      if (!dbDataReturns) {
        res.status(404).json({ message: 'category not found' });
        return;
      }
      res.json(dbDataReturns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbDataReturns) => {
      if (!dbDataReturns) {
        res.status(404).json({ message: 'category not found' });
        return;
      }
      res.json(dbDataReturns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbDataReturns) => res.json(dbDataReturns))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((dbDataReturns) => {
      if (!dbDataReturns) {
        res.status(404).json({ message: 'category not found' });
        return;
      }
      res.json(dbDataReturns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDataReturns) => {
      if (!dbDataReturns) {
        res.status(404).json({ message: 'category not found' });
        return;
      }
      res.json(dbDataReturns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
