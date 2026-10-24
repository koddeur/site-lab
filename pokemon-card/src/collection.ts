/* La collection : créatures originales, prix fictifs en euros. */

export type Kind = "grass" | "fire" | "water" | "electric" | "psy" | "any";

export type Move = { cost: Kind[]; name: string; dmg: string; text?: string };

export type Creature = {
  id: string;
  name: string;
  hp: number;
  type: Exclude<Kind, "any">;
  dex: string;
  moves: Move[];
  weakness: Kind;
  retreat: number;
  flavor: string;
  number: string;
  /* côté collection */
  rarity: string;
  condition: string;
  grade: string;
  qty: number;
  paid: number;
  value: number;
  acquired: string;
};

export const COLLECTION: Creature[] = [
  {
    id: "papilume",
    name: "Papilume",
    hp: 70,
    type: "grass",
    dex: "N° 0042 · Pokémon Papillon · Taille 0,4 m · Poids 1,2 kg",
    moves: [
      { cost: ["grass"], name: "Poudre Dorée", dmg: "10", text: "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Endormi." },
      { cost: ["grass", "any"], name: "Rafale d'Ailes", dmg: "40" },
    ],
    weakness: "fire",
    retreat: 1,
    flavor: "Ses ailes poudrées brillent à l'aube. On dit qu'il suit les promeneurs perdus jusqu'à la lisière.",
    number: "042/151",
    rarity: "Rare Holo",
    condition: "Near Mint",
    grade: "PSA 9",
    qty: 1,
    paid: 85,
    value: 132,
    acquired: "mars 2024",
  },
  {
    id: "flameche",
    name: "Flamèche",
    hp: 60,
    type: "fire",
    dex: "N° 0007 · Pokémon Braise · Taille 0,5 m · Poids 6,8 kg",
    moves: [
      { cost: ["fire"], name: "Étincelle", dmg: "20" },
      { cost: ["fire", "fire"], name: "Queue Brûlante", dmg: "50", text: "Défaussez une énergie Feu attachée à ce Pokémon." },
    ],
    weakness: "water",
    retreat: 1,
    flavor: "Il dort enroulé autour de sa queue. Les nuits d'hiver, les enfants se serrent contre lui.",
    number: "007/151",
    rarity: "Commune",
    condition: "Excellent",
    grade: "Non gradée",
    qty: 3,
    paid: 3,
    value: 2.4,
    acquired: "juin 2023",
  },
  {
    id: "goutelot",
    name: "Goutelot",
    hp: 60,
    type: "water",
    dex: "N° 0018 · Pokémon Rosée · Taille 0,3 m · Poids 2,1 kg",
    moves: [
      { cost: ["water"], name: "Bulle", dmg: "10", text: "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé." },
      { cost: ["water", "any"], name: "Pistolet à O", dmg: "30" },
    ],
    weakness: "electric",
    retreat: 1,
    flavor: "On le trouve au matin sur les feuilles de nénuphar. Il s'évapore quand on le gronde.",
    number: "018/151",
    rarity: "Peu commune",
    condition: "Near Mint",
    grade: "Non gradée",
    qty: 2,
    paid: 6,
    value: 9.5,
    acquired: "janv. 2024",
  },
  {
    id: "voltouille",
    name: "Voltouille",
    hp: 80,
    type: "electric",
    dex: "N° 0025 · Pokémon Pile · Taille 0,4 m · Poids 5,5 kg",
    moves: [
      { cost: ["electric"], name: "Joue Statique", dmg: "20" },
      { cost: ["electric", "electric", "any"], name: "Éclair Rond", dmg: "90", text: "Ce Pokémon s'inflige 20 dégâts." },
    ],
    weakness: "grass",
    retreat: 1,
    flavor: "Il range l'électricité de l'orage dans ses joues. Une seule caresse suffit à vous friser les cheveux.",
    number: "025/151",
    rarity: "Rare",
    condition: "Mint",
    grade: "PSA 10",
    qty: 1,
    paid: 140,
    value: 310,
    acquired: "sept. 2022",
  },
  {
    id: "spectrelle",
    name: "Spectrelle",
    hp: 90,
    type: "psy",
    dex: "N° 0094 · Pokémon Voile · Taille 1,1 m · Poids 0,1 kg",
    moves: [
      { cost: ["psy"], name: "Murmure", dmg: "", text: "Le Pokémon Défenseur est maintenant Confus." },
      { cost: ["psy", "psy", "any"], name: "Voile Hanté", dmg: "70" },
    ],
    weakness: "psy",
    retreat: 2,
    flavor: "Elle danse dans les greniers abandonnés. Ceux qui l'ont vue jurent qu'elle fredonnait.",
    number: "094/151",
    rarity: "Ultra rare · 1re édition",
    condition: "Near Mint",
    grade: "PSA 8",
    qty: 1,
    paid: 420,
    value: 385,
    acquired: "déc. 2023",
  },
];
