import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import React from 'react';

interface RadarrProps {
  radarrApiKey: string;
  radarrUrl: string;
}

const Radarr: React.FC<RadarrProps> = ({ radarrApiKey, radarrUrl }) => {
  const [movieStatus, setMovieStatus] = useState<string | null>(null);

  // Example movie ID. This would typically come from the user or your app state.
  const movieId = 1234; 

  useEffect(() => {
    fetchMovieStatus();
  }, []);

  async function fetchMovieStatus() {
    try {
      const response = await axios.get(`${radarrUrl}/api/movie/${movieId}`, {
        headers: { 'X-Api-Key': radarrApiKey }
      });
      setMovieStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching movie status:', error);
    }
  }

  // Example function for controlling Radarr
  async function refreshMovie() {
    try {
      await axios.post(
        `${radarrUrl}/api/command`,
        { name: 'RefreshMovie', movieId },
        { headers: { 'X-Api-Key': radarrApiKey } }
      );
    } catch (error) {
      console.error('Error refreshing movie:', error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl text-blue-600">Radarr</h2>
      <p>Movie status: {movieStatus || 'Loading...'}</p>
      <Button color="primary" auto onClick={refreshMovie}>
        Refresh Movie
      </Button>
    </div>
  );
}

export default Radarr;
