import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Checkbox } from '@nextui-org/react';

export default function Settings() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await axios.get('/api/settings');
    setSettings(res.data);
  };

  const saveSettings = async () => {
    await axios.post('/api/settings', settings);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Checkbox
          isSelected={settings.modules?.radarr?.enabled || false}
          onChange={(isChecked) => setSettings({ ...settings, modules: { ...settings.modules, radarr: { ...settings.modules.radarr, enabled: isChecked } } })}
        >
          Enable Radarr
        </Checkbox>
      </div>
      {settings.modules?.radarr?.enabled && (
        <>
          <div className="flex gap-2">
            <label htmlFor="radarrApiKey">Radarr API Key:</label>
            <Input
              id="radarrApiKey"
              value={settings.modules.radarr.apiKey || ''}
              onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, radarr: { ...settings.modules.radarr, apiKey: e.target.value } } })}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="radarrUrl">Radarr Host URL:</label>
            <Input
              id="radarrUrl"
              value={settings.modules.radarr.url || ''}
              onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, radarr: { ...settings.modules.radarr, url: e.target.value } } })}
            />
          </div>
        </>
      )}
      <Button color="primary" auto onClick={saveSettings}>
        Done
      </Button>
    </div>
  );
}