const { fighter } = require('../models/fighter');

const updateFighterValid  = (req, res, next) => {
  const { name, health, power, defense } = req.body;
  fighter.name = name;
  fighter.power = power;
  fighter.defense = defense;
  if (health) {
    fighter.health = health;
  }

  if (fighter.name && fighter.health && fighter.power && fighter.defense) {
    const isPowerValid =
      typeof fighter.power === 'number' && fighter.power > 0 && fighter.power < 100;
    const isDefenseValid =
      typeof fighter.defense === 'number' && fighter.defense > 1 && fighter.defense < 10;
    const isHealthValid = 
        typeof fighter.health === 'number' && fighter.health > 80 && fighter.health < 120;

    if (isPowerValid && isDefenseValid && isHealthValid) {
      req.body = {
        name: fighter.name,
        health: fighter.health,
        power: fighter.power,
        defense: fighter.defense,
      };
      next();
    } else {
      res.body = res.status(400).json({
        error: true,
        message: 'Power, defense or health are not valid',
      });
      next(res.body);
    }
  } else {
    res.body = res.status(400).json({
      error: true,
      message: 'Fighter entity is not valid',
    });
    next(res.body);
  }
};

exports.updateFighterValid  = updateFighterValid;
