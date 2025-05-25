import { getAllServers, createServer } from '../models/servers.js';

export const listServers = async (req, res) => {
  const servers = await getAllServers();
  res.json(servers);
};

export const addServer = async (req, res) => {
  const server = await createServer(req.body);
  res.json(server);
};
