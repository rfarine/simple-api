const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const chalk = require('chalk');

// CREATE
async function create(file) {
  try {
    const form = new FormData();
    const locatedFile = fs.createReadStream(file);
    form.append('file', locatedFile);

    const response = await axios.post('http://localhost:3000', form, { headers: form.getHeaders() });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// READ
async function read(id) {
  try {
    const response = await axios.get(`http://localhost:3000/get/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// UPDATE
async function update(file, id) {
  try {
    const form = new FormData();
    const locatedFile = fs.createReadStream(file);
    form.append('file', locatedFile);

    await axios.put(`http://localhost:3000/update/${id}`, form, { headers: form.getHeaders() });

    return read(id);
  } catch (error) {
    console.log(error);
  }
}

// DELETE
async function del(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/delete/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

// ALL
async function all() {
  try {
    const response = await axios.get('http://localhost:3000');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { create, read, update, del, all };
