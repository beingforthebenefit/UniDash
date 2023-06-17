import { useState, useEffect } from 'react';
import { Button, Modal, Text } from '@nextui-org/react';
import axios from 'axios';
import Radarr from '../components/Radarr';
import Settings from '../components/Settings';

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, [settings]);

  const fetchSettings = async () => {
    const res = await axios.get('/api/settings');
    setSettings(res.data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-5xl text-blue-600">Welcome to UniDash!</h1>
      <Button color="primary" auto onClick={() => setSettingsOpen(true)}>
        Settings
      </Button>
      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div className="flex flex-col gap-2 p-4">
          <Text h3>App Settings</Text>
          <Settings />
        </div>
      </Modal>
      {settings.modules?.radarr?.enabled && (
        <Radarr radarrApiKey={settings.modules.radarr.apiKey} radarrUrl={settings.modules.radarr.url} />
      )}
    </div>
  );
}