import { TextField } from 'material-ui';
import { createFighter } from '../../services/domainRequest/fightersRequest';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './newFighter.css';

export default function NewFighter({ onCreated }) {
  const [name, setName] = useState();
  const [power, setPower] = useState();
  const [defense, setDefense] = useState();
  const [health, setHealth] = useState();

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPowerChange = (event) => {
    const value =
      event.target.value || event.target.value === 0 ? Number(event.target.value) : null;
    setPower(value);
  };

  const onDefenseChange = (event) => {
    const value =
      event.target.value || event.target.value === 0 ? Number(event.target.value) : null;
    setDefense(value);
  };

  const onHealthChange = (event) => {
    const value =
      event.target.value || event.target.value === 0 ? Number(event.target.value) : null;
    setHealth(value);
  };

  const onSubmit = async () => {
    const data = await createFighter({ name, power, defense, health });
    if (data && !data.error) {
      onCreated(data);
    }
  };

  return (
    <div id="new-fighter">
      <div>New Fighter</div>
      <div>
        <TextField
          onChange={onNameChange}
          id="standard-basic"
          label="Standard"
          placeholder="Name"
        />
      </div>
      <div>
        <TextField
          onChange={onPowerChange}
          id="standard-basic"
          label="Standard"
          placeholder="Power"
          type="number"
        />
      </div>
      <div>
        <TextField
          onChange={onDefenseChange}
          id="standard-basic"
          label="Standard"
          placeholder="Defense"
          type="number"
        />
      </div>
      <div>
        <TextField
          onChange={onHealthChange}
          id="standard-basic"
          label="Standard"
          placeholder="Health"
          type="number"
        />
      </div>
      <Button onClick={onSubmit} variant="contained" color="primary">
        Create
      </Button>
    </div>
  );
}