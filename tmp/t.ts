import { horseshit } from "./horseshit";

export const createJSON = () => {
    const fs = require('fs');
    const jsonContent = JSON.stringify(horseshit, null, 2);
    fs.writeFileSync('./t.json', jsonContent);
  }