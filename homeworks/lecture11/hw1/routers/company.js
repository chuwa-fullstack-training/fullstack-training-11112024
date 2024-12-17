const express = require('express')
const router = express.Router()
const { Company } = require('../schema.js')
const verifyToken = require('../verifyToken')

router.post('/', verifyToken, async (req, res) => {
    if(req.isAuthorized){
        try {
            const companyObj = new Company(req.body);
            const company = await companyObj.save();
            res.status(201).json({ company });
        } catch(err) {
            console.log('Error occured while creating the company')
            res.status(400).json({ error: err.messsage })
        }
    } else {
        res.status(403).json({ message: "Not Authorized"})
    }
    
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const company = await Company.findById(id).select(" -_id -employees" )
        if(!company){
            res.status(404).json({ message: "No company found"})
        }
        res.status(200).json({ company })
    } catch(err){
        console.log('Error occured while creating the company')
        res.status(400).json({ error: err.messsage })
    }
    
})

router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    if(req.isAuthorized){
        try {
            const company = await Company.findOneAndUpdate({ _id: id }, req.body )
            if(!company){
                res.status(404).json({ message: "No company found"})
            }
            res.status(200).json({ company })
    
        } catch(err) {
            console.log(err.message)
            console.log('Error occured while updating the company')
            res.status(400).json({ error: err.messsage })
        }

    } else {
        res.status(403).json({ message: "Not Authorized"})
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    if(req.isAuthorized){
        try {
            const company = await Company.findOneAndDelete({ _id: id })
            if(!company){
                res.status(404).json({ message: "No company found"})
            }
            res.status(200).json({ message: "deleted" })
    
        } catch(err) {
            console.log('Error occured while deleting the company')
            res.status(400).json({ error: err.messsage })
        }
    } else {
        res.status(403).json({ message: "Not Authorized"})
    }
})

router.get('/', async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json({ companies })
    } catch(err){
        console.log('Error occured')
        res.status(400).json({ error: err.messsage })
    }
})

router.get('/:id/employees', verifyToken, async (req, res) => {
    const { id } = req.params;
    if(req.isAuthorized){
        try {
            let data = await Company.findById({ _id: id }).populate("employees").select("employees -_id")
            res.status(200).json({ employees: data.employees })
    
        } catch(err) {
            console.log('Error occured')
            res.status(400).json({ error: err.messsage })
        }
    } else {
        res.status(403).json({ message: "Not Authorized"})
    }
})


module.exports = router;