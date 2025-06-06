import { promises as fs } from 'fs';
const path = './fichiers.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Méthode non autorisée');
  const { url } = req.body;
  if (!url) return res.status(400).send('URL manquante');

  try {
    const raw = await fs.readFile(path, 'utf-8');
    const liste = JSON.parse(raw);
    if (!liste.includes(url)) liste.push(url);
    await fs.writeFile(path, JSON.stringify(liste, null, 2));
    res.status(200).send('URL ajoutée avec succès');
  } catch (err) {
    res.status(500).send('Erreur serveur : ' + err.message);
  }
}
