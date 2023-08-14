const db = require("../models");
const User = db.users;

const Op = db.Sequelize.Op;

//create
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Nome é requrido" });
    return;
  }
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao cadastrar o usuário" })
    );
};
//find All
exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({where: condition})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

//find One
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao buscar o Id" + id,
      });
    });
};
//update
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  }).then((occ) => {
    if (occ == 1) {
      res.status(200).send({ message: "Usuário atualizado com sucesso!" });
      return;
    }
    res.send({ message: "Não foi possível atualizar o usuário." });
  });
};
//delete
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then(res.status(200).send({ message: "Usuario deletado com sucesso" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
//delete All
exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false })
    .then(res.status(200).send({ message: "Todos os usuarios foram apagados" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
