const Employee = require("../models/Employee");


class EmployeeController {
    constructor() {

    }

    async getAllEmployees(request, response) {
        try {
            const employees = await Employee.find();
            if(!employees) {
                return response.status(404).json({
                    message: "No employees found"
                })
            }

            response.json(employees);
        } catch(error) {
            response.status(404).json({
                message: error,
            })
        }
    }

    async getEmployee(request, response) {
        const {id} = request.params;
        if(!id) {
            return response.status(404).json({
                message: "Employee ID required",
            })
        }

        try {
            const employee = await Employee.findOne({
                _id: id
            }).exec();

            if(!employee) {
                return response.status(204).json({
                    message: "Employee not found"
                })
            }

            response.status(200).json(employee)
        } catch(error) {
            response.status(500).json({
                message: error
            })
        }
    }

    async createNewEmployee(request, response) {
        try {
            const {firstName, lastName} = request.body;

            if(!firstName || !lastName) {
                return response.status(400).json({
                    message: "Firstname and lastName are required",
                })
            }

            const result = await Employee.create({
                firstName: firstName,
                lastName: lastName,
            })

            response.status(202).json(result)
        } catch(error) {
            response.status(500).json({
                message: error
            })
        }
    }

    async updateEmployee(request, response) {
        try {
            const {id} = request.params;
            const { firstName, lastName} = request.body;

            if(!id ) {
                return response.status(404).json({
                    message: "No employee matching id"
                })
            }

            const employee = await Employee.findOne({
                _id: id,
            }).exec();
            if(!employee) return response.status(200).json({
                message: "No employee matching",
            })
            if(firstName) employee.firstName = firstName;
            if(lastName) employee.lastName = lastName;
            const result = await employee.save();
            response.status(200).json({
                result
            })
        } catch(error) {
            response.status(500).json({
                message: error,
            })
        }

        
    }

    async deleteEmployee(request, response) {
        try {
            const {id} = request.params;
            if(!id ) {
                return response.status(404).json({
                    message: "No employee matching id"
                })
            }
            const employee = await Employee.findOne({
                _id: id,
            }).exec();
            if(!employee) return response.status(200).json({
                message: "No employee matching",
            })

            const result = await employee.deleteOne();
            response.status(200).json(result)

        } catch(error) {
            response.status(404).json({
                message: error
            })
        }
    }
}

module.exports = new EmployeeController();