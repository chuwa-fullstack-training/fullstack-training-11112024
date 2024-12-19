const express = require('express');
const {
  getAllCompanies,
  getCompanyById,
  getAllEmployeesByCompany,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
} = require('../controllers/companies');
const auth = require('../middlewares/auth');
const router = express.Router();

// /api/companies
router.get('/', getAllCompanies);

router.get('/:id', getCompanyById);

router.get('/:id/employees', auth, getAllEmployeesByCompany);

router.post('/', createCompany);

router.put('/:id', updateCompanyById);

router.delete('/:id', deleteCompanyById);

module.exports = router;
