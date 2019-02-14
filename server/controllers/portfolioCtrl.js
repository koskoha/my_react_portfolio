
const Portfolio = require('../models/portfolio');

exports.getPortfolios = (req, res) => {
  Portfolio.find({})
    .sort({ 'startDate': -1 })
    .exec((err, allPortfolios) => {
      if (err) {
        return res.status(422).send(normalizeErrors(err))
      }
      return res.json(allPortfolios);
    });
}

exports.getPortfolioById = (req, res) => {
  const id = req.params.id;
  Portfolio
    .findById(id)
    .select('-__v')
    .exec((err, foundPortfolio) => {
      if (err) {
        return res.status(422).send(normalizeErrors(err));
      }
      return res.json(foundPortfolio);
    });
}

exports.savePortfolio = (req, res) => {
  const newPortfolio = req.body;
  const userId = req.user && req.user.sub;
  newPortfolio.userId = userId;
  const portfolio = new Portfolio(newPortfolio);
  portfolio.save((err, addedPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(addedPortfolio);
  })
}

exports.updatePortfolio = (req, res) => {
  const portfolioData = req.body;
  const id = req.params.id;

  Portfolio.findById(id, (err, foundPortfolio) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err))
    }

    foundPortfolio.set(portfolioData);
    foundPortfolio.save((err, updatedPortfolio) => {
      if (err) {
        return res.status(422).send(normalizeErrors(err))
      }

      return res.json(updatedPortfolio);
    })
  })
}

exports.deletePortfolio = (req, res) => {
  const id = req.params.id;
  Portfolio.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err))
    }

    return res.json({ status: 'portfolio deleted.' })
  })
}

function normalizeErrors(errors) {
  let normalizeErrors = [];

  for (let property in errors) {
    if (errors.hasOwnProperty(property)) {
      normalizeErrors.push({ title: property, detail: errors[property].message });
    }
  }

  return normalizeErrors;
}