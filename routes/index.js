const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const fs = require('fs');
const db = require('../models');

/* GET all cats */
router.get('/', async (req, res, next) => {
  try {
    const cats = await db.Cat.findAll();
    console.dir(cats, {depth: null, colors: true});
    return res.status(200).json(cats);
  } catch (error) {
    return res.send(error);
  }
});

/* GET cat by ID */
router.get('/get/:id', async (req, res) => {
  try {
    const cat = await db.Cat.findAll({ where: { id: req.params.id }});
    console.dir(cat, {depth: null, colors: true});
    return res.status(200).json(cat);
  } catch (error) {
    return res.send(error);
  }
});

/* POST cat */
router.post('/', async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send(createError(400, 'You need to upload a file!')).end();
  }

  const file = req.files.file;
  const fileDestination = `uploads/${file.name}`;

  await file.mv(fileDestination, (err) => {
    if (err) {
      return res.send(err);
    }

    console.log(`*** Uploaded file to ${fileDestination}`);
  });

  try {
    const cat = await db.Cat.create({ filename: fileDestination });
    console.dir(cat, {depth: null, colors: true})

    return res.status(200).send(cat);
  } catch (error) {
    return res.send(error);
  }
});

/* PUT cat - update */
router.put('/update/:id', async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send(createError(400, 'You need to upload a file!')).end();
  }

  const file = req.files.file;
  const fileDestination = `uploads/${file.name}`;

  await file.mv(fileDestination, (err) => {
    if (err) {
      return res.send(err);
    }

    console.log(`*** Uploaded file to ${fileDestination}`);
  });

  try {
    const cat = await db.Cat.update({ filename: fileDestination }, {
      where: {
        id: req.params.id
      }
    });

    return res.status(200).end();
  } catch (error) {
    return res.send(error)
  }
});

/* DELETE cat */
router.delete('/delete/:id', async (req, res, next) => {
  try {
    await db.Cat.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
  if (rowDeleted === 1) {
    return res.status(200).send(`Cat with id: ${req.params.id} was deleted!`).end();
  }

  return res.status(200).send('Nothing to delete! That cat did not exist!');
});

  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
