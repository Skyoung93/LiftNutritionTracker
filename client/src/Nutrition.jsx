import React, { useState } from 'react';
import axios from 'axios';

import LiftEntry from './LiftEntry.jsx';
import { convertDatefromUnix, convertDatetoUnix } from './helpers.jsx';

let entryTemplate = {
  "id": 0,
  "name": '',
  "mass": 0,
  "carbs": 0,
  "fiber": 0,
  "sugars": 0,
  "proteins": 0,
  "fats": 0,
  "trans": 0,
  "saturated": 0,
  "year": "2000",
  "month": "1",
  "calday": "1"
};

const Nutrition = () => {
  return(
    <div>
      NUT
    </div>
  )
};

export default Nutrition;