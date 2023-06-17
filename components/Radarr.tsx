import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@nextui-org/react';

interface RadarrProps {
  radarrApiKey: string;
  radarrUrl: string;
}

interface Movie {
  downloaded: boolean;
  hasFile: boolean;
}

export default function Radarr({ radarrApiKey, radarrUrl }: RadarrProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
      const res = await axios.get(`${radarrUrl}/api/v3/movie`, {
        headers: {
          'X-Api-Key': radarrApiKey,
        },
      });
      setMovies(res.data);
    };
    fetchMovies();
  }, [radarrApiKey, radarrUrl]);

  const downloadedMovies = movies.filter((movie) => movie.downloaded).length;
  const missingMovies = movies.filter((movie) => !movie.hasFile).length;

  return (
    <Card>
      <Card.Body>
        <h2>Radarr Stats</h2>
        <p>Total movies: {movies.length}</p>
        <p>Downloaded movies: {downloadedMovies}</p>
        <p>Missing movies: {missingMovies}</p>
      </Card.Body>
    </Card>
  );
}