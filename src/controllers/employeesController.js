const { Employee } = require('../models');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
}

const createNewEmployee = async (req, res) => {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    try {
        const newEmployee = await Employee.create({ firstname, lastname });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error creating employee" });
    }
}

const updateEmployee = async (req, res) => {
    const { id, firstname, lastname } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${id} not found` });
        }
        if (firstname) employee.firstname = firstname;
        if (lastname) employee.lastname = lastname;
        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error updating employee" });
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${id} not found` });
        }
        await employee.destroy();
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
}

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${id} not found` });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee" });
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}