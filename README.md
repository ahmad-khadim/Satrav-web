# SATRAV — site web

Site vitrine de **SATRAV** (Société Africaine de Travaux) : manutention, courtage maritime, affrètement, consignation et transport maritime.

Fait avec [Next.js](https://nextjs.org) et Tailwind CSS.

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Modifier le contenu

- **Textes des services** : tableau `services` en haut de `app/page.tsx`
- **Photos des services** : mettre l'image dans `public/` puis renseigner `image: "/nom-du-fichier.jpg"` dans le service correspondant
- **Titre et description (Google, partage WhatsApp)** : `app/layout.tsx`

## Mise en ligne

Le projet se déploie directement sur [Vercel](https://vercel.com) : importer le dépôt GitHub, aucun réglage particulier n'est nécessaire.
