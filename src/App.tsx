import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import { Panel } from './components/Panel';
import { Settings } from './components/Settings';
import { useStore } from './stores';
import { getModels, listSkills, listMCPServers } from './services/api';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { setModels, setSkills, setMCPServers, addConversation, conversations } = useStore();

  useEffect(() => {
    const init = async () => {
      try {
        setModels(await getModels());
        setSkills(await listSkills());
        setMCPServers(await listMCPServers());
        if (conversations.length === 0) addConversation();
      } catch (error) {
        console.error('Init error:', error);
      }
    };
    init();
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
      <Chat />
      <Panel />
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
