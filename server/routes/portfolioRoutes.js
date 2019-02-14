const express = require('express');
const router = express.Router();

const portfolioCtrl = require('../controllers/portfolioCtrl');
const authServices = require('../services/auth');

// router.get('', portfolioCtrl.getPortfolios);

// router.post('', portfolioCtrl.savePortfolio);

// router.patch('/:id', portfolioCtrl.updatePortfolio);

// router.delete('/:id', portfolioCtrl.deletePortfolio);


router.get('', portfolioCtrl.getPortfolios);

router.get('/:id', portfolioCtrl.getPortfolioById);

router.post('', authServices.checkJWT, authServices.checkRole('siteOwner'), portfolioCtrl.savePortfolio);

router.patch('/:id', authServices.checkJWT, authServices.checkRole('siteOwner'), portfolioCtrl.updatePortfolio);

router.delete('/:id', authServices.checkJWT, authServices.checkRole('siteOwner'), portfolioCtrl.deletePortfolio);

module.exports = router;