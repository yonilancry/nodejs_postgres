const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller.js');

router.get('/', (req, res) => {
  res.json({ message: "Yoni" });
});

// Route pour obtenir le projet avec le plus gros budget
router.get('/projet/max-budget', projectController.getProjetMaxBudget);

// Route pour les employés affectés à la fois sur le projet "Intranet" (P01) et "Site Web" (P03)
router.get('/projet/intranet-siteweb/employes', projectController.getEmployesAffectesDeuxProjets);

module.exports = router;
