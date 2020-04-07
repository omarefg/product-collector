const express = require('express');
const CriteriaService = require('./criteriaService');

function criteriaAPI(app){
    const router = express.Router();
    app.use('/api/criteria', router);
    const criteriaService = new CriteriaService();

    router.get('/', async function(req, res, next){ 
        try {
            const criteria = await criteriaService.getCriteria();
            res.status(200).json({
                data: criteria,
                message:'criterias listed'
            });
        }catch(err){
            next(err);
        }
    });
    router.post('/', async function(req, res, next){ 
        const { body: criteria } = req;
        try {
            const createdCriteriaId = await criteriaService.createCriteria({ criteria });
            res.status(201).json({
                data: createdCriteriaId,
                message:'criteria created'
            });
        }catch(err){
            next(err);
        }
    });
    router.delete('/:criteriaId', async function(req, res, next) {
          const { criteriaId } = req.params;
          try {
            const deletedCriteriaId = await criteriaService.deleteCriteria({ criteriaId });
            res.status(200).json({
              data: deletedCriteriaId,
              message: 'criteria deleted'
            });
          } catch (err) {
            next(err);
          }
        }
      );
    
} 

module.exports = criteriaAPI;