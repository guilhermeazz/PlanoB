const mongoose = require('mongoose');

const DescontoGameSchema = new mongoose.Schema({
  nomeJogo: String,
  precoOriginal: Number,
  porcentagemDesconto: Number
});

module.exports = mongoose.model('DescontoGame', DescontoGameSchema);
