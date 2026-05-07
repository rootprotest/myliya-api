// routes/EmployeeRoutes/employeeRoutes.js

const express = require("express");

const router = express.Router();

const EmployeeController = require("../../controllers/AddEmployeeController/EmployeeController");

// CREATE
router.post(
  "/createEmployee",
  EmployeeController.createEmployee
);

// GET ALL
router.get(
  "/getEmployees",
  EmployeeController.getEmployees
);

// GET SINGLE
router.get(
  "/getEmployee/:id",
  EmployeeController.getEmployeeById
);

// UPDATE
router.put(
  "/updateEmployee/:id",
  EmployeeController.updateEmployee
);

// DELETE
router.delete(
  "/deleteEmployee/:id",
  EmployeeController.deleteEmployee
);

module.exports = router;