import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

function unflattenJSON(obj: { [x: string]: any; }) {
  const result = {};

  for (let key in obj) {
    let value = obj[key];

    // Convert strings 'true' and 'false' to their boolean equivalents
    if (value === 'true') value = true;
    else if (value === 'false') value = false;

    // split the key into its parts (e.g. ['modules', 'radarr', 'enabled'])
    let parts = key.split('[').map(part => part.replace(']', ''));

    // start at the top level of the result object
    let target = result;

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];

      if (i === parts.length - 1) {
        // if we're at the last part, set the value
        target[part] = value;
      } else {
        // otherwise, move down one level (creating the object if necessary)
        target[part] = target[part] || {};
        target = target[part];
      }
    }
  }

  return result;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const settingsPath = path.resolve('./settings.json');

  if (req.method === 'GET') {
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify({}), 'utf8');
    }

    const data = fs.readFileSync(settingsPath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const newSettings = unflattenJSON(req.body);
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings), 'utf8');
    res.status(200).json({ message: 'Settings updated' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
