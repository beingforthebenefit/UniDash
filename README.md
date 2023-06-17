# UniDash

UniDash is a comprehensive dashboard for managing and controlling a range of applications including Portainer, Traefik, Plex, Radarr, Sonarr, qBittorrent, Vaultwarden, and PiHole. This project is built with Next.js, Tailwind CSS, NextUI and Docker, and is designed to be easily customizable and extensible.

## Features

- Real-time statistics display for each service
- Interactive controls for managing services
- Sleek and modern interface with responsive design
- Dockerized for easy setup and deployment

## Getting Started

These instructions will help you set up UniDash on your local machine for development and testing.

### Prerequisites

- Node.js v14 or newer
- Docker

### Installation

1. Clone the repository:

```bash
git clone https://github.com/beingforthebenefit/unidash.git
cd unidash
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building a Docker Image

To build a Docker image for UniDash, you can use the included `Dockerfile`. Navigate to the project directory and run:

```bash
docker build -t unidash .
```

Then, to start the application inside a Docker container, run:

```bash
docker run -p 3000:3000 unidash
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## License

This project is licensed under the MIT License. See `LICENSE` for more information.

## Contact

Gerald Todd - gerald@gtodd.dev
