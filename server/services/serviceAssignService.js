const ServiceAssign = require('../models/ServiceAssign');

class ServiceAssignService {
  static async getAllServiceAssignments() {
    return await ServiceAssign.findAll();
  }

  static async getServiceAssignmentById(assignmentId) {
    return await ServiceAssign.findByPk(assignmentId);
  }

  static async createServiceAssignment({ UserID, UserName, ProductName, SerialNumber, ServiceStatus, Description }) {
    return await ServiceAssign.create({
      UserID,
      UserName,
      ProductName,
      SerialNumber,
      ServiceStatus,
      Description,
    });
  }

  static async updateServiceAssignment(assignmentId, { UserID, ProductName, SerialNumber, ServiceStatus, Description }) {
    const serviceAssignment = await ServiceAssign.findByPk(assignmentId);

    if (!serviceAssignment) {
      return null; // Or throw an error, depending on your error handling strategy
    }

    serviceAssignment.UserID = UserID;
    serviceAssignment.ProductName = ProductName;
    serviceAssignment.SerialNumber = SerialNumber;
    serviceAssignment.ServiceStatus = ServiceStatus;
    serviceAssignment.Description = Description;

    await serviceAssignment.save();
    return serviceAssignment;
  }

  static async deleteServiceAssignment(assignmentId) {
    const serviceAssignment = await ServiceAssign.findByPk(assignmentId);

    if (!serviceAssignment) {
      return false; // Or throw an error, depending on your error handling strategy
    }

    await serviceAssignment.destroy();
    return true;
  }
}

module.exports = ServiceAssignService;
