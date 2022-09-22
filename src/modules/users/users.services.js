const {
  POST_TUTOR,
  POST_ADMINISTRATIVO,
  POST_PRECEPTOR,
  POST_SUPERVISOR,
} = require("../../core/constants/constants.js");
const TypeUsers = require("../typeUsers/typeUsers.models");
const Users = require("./users.models");
const { tutor, preceptor, administrativo } = require("./users.functions.js");
const Students = require("../students/students.models.js");
const Course = require("../course/course.models.js");

module.exports = {
  // Crea Usuarios
  async createUser(req, res) {
    switch (req.body.type) {
      case POST_TUTOR:
        let replyTutors = await tutor(req.body);
        return res.status(200).json(replyTutors);
      case POST_ADMINISTRATIVO:
        let replyAdmin = await administrativo(req.body);
        return res.status(200).json(replyAdmin);
      case POST_PRECEPTOR:
        let replyPreceptor = await preceptor(req.body);
        return res.status(200).json(replyPreceptor);
      case POST_SUPERVISOR:
        let replySupervisor = await administrativo(req.body);
        return res.status(200).json(replySupervisor);
      default:
        res.json({error: "error in sending the type"});
    }
  },

  // LLAMA TODO INCLUYENDO TIPO DE USUARIO, ESTUDIANTE, CURSOS
  async getAll(req, res) {
    try {
      const getall = await Users.findAll({
        include: [
          {
             model: TypeUsers, 
            attributes: ["typeUsers"] },
          {
            model: Students,
            attributes: [
              "idStudent",
              "firstNames",
              "lastName",
              "dniStudent",
              "birthDate",
            ],
            through: { attributes: [] },
            include: [
              {
                model: Course,
                attributes: ["nameCourse"],
              },
            ],
          },
          { model: Course, attributes: ["nameCourse"] },
        ],
        attributes: ["idUser", "firstNames", "lastName", "phone", "email"],
      });

      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  async getPassword(req, res) {
    try {
      const getall = await Users.findAll({
        attributes: ["email", "password", "firstNames", "lastName"],
      });

      res.status(200).json(getall);

    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },
};
