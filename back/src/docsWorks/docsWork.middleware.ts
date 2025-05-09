import { AppDataSource } from "../data-source";
import { StudentsEntity } from "../entities/students.entity";

const db = AppDataSource.getRepository(StudentsEntity);

function formatDate(req, res, next) {
  let formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  req.body.dateStart = formatter.format(new Date(req.body.dateStart)).replace(' г.', '');;

  req.body.dateEnd = formatter.format(new Date(req.body.dateEnd)).replace(' г.', '');;
  next();
}

function saveStudentToDatabase(req, res, next) {
  db.save({ ...req.body });
  next();
}

export {
  formatDate,
  saveStudentToDatabase
}