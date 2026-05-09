
export interface Mindshare {
  id: number;
  posterFile: string;
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

const mindshareFiles = [
  "WhatsApp Image 2026-04-20 at 21.15.44 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.15.44.jpeg",
  "WhatsApp Image 2026-04-20 at 21.15.45 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.15.45.jpeg",
];

const titles = [
  "Gestion des complications implantaires",
  "L'IA en dentisterie : Le Futur est Maintenant",
  "Gestion du stress en cabinet dentaire",
  "L'Excellence Clinique au Quotidien",
];

const authors = [
  "Dr. Amina Benali",
  "Dr. Karim Oussama",
  "Dr. Soraya Meziane",
  "Dr. Yacine Hadj",
];

const authorTitles = [
  "Chirurgienne Orale · Alger",
  "Implantologiste · Constantine",
  "Psychologue Clinicienne · Oran",
  "Omnipraticien · Annaba",
];

const categories = ['clinique', 'innovation', 'bien-etre', 'pratique'];
const categoryLabels = ['Cas Clinique', 'Innovation', 'Bien-être', 'Bonne Pratique'];

const excerpts = [
  "Une analyse approfondie des situations délicates en implantologie et des leçons apprises pour améliorer nos protocoles de gestion des risques post-opératoires.",
  "Comment l'intelligence artificielle transforme le diagnostic, la planification de traitement et la relation patient. Un regard vers l'avenir de notre profession.",
  "Le stress chronique en cabinet dentaire affecte la précision clinique et la santé du praticien. Découvrez des stratégies concrètes pour retrouver l'équilibre.",
  "Retour d'expérience sur les habitudes quotidiennes qui font la différence entre un cabinet fonctionnel et un cabinet d'exception.",
];

const contents = [
  [
    "La gestion des complications en implantologie représente l'un des défis les plus complexes de notre pratique quotidienne. Chaque complication est une opportunité d'apprentissage qui renforce notre expertise clinique.",
    "Dans cette analyse, nous examinons les cas les plus fréquents de péri-implantite, de perte osseuse précoce et de complications prothétiques, en proposant des protocoles de résolution systématiques et reproductibles.",
    "L'approche préventive reste notre meilleure arme : un diagnostic précis, une planification rigoureuse et un suivi post-opératoire structuré permettent de réduire significativement le taux de complications.",
    "Nous partageons également les retours d'expérience de praticiens expérimentés qui ont développé des approches innovantes face à des situations cliniques complexes.",
  ],
  [
    "L'intelligence artificielle n'est plus une vision futuriste — elle est déjà présente dans nos cabinets. Des algorithmes de détection de caries sur radiographies aux systèmes de planification implantaire assistée, l'IA transforme notre quotidien.",
    "Les outils de diagnostic assisté par IA atteignent aujourd'hui des niveaux de précision comparables, voire supérieurs, à ceux de praticiens expérimentés pour certaines pathologies spécifiques.",
    "Cependant, l'IA ne remplace pas le jugement clinique. Elle augmente nos capacités, nous libère des tâches répétitives et nous permet de nous concentrer sur ce qui compte vraiment : la relation patient.",
    "Nous explorons les applications concrètes disponibles aujourd'hui et les innovations qui façonneront la dentisterie de demain.",
  ],
  [
    "Le stress en cabinet dentaire est un phénomène systémique qui touche l'ensemble de l'équipe soignante. Ses conséquences sur la précision des gestes cliniques et la qualité de la prise en charge sont bien documentées.",
    "Les sources de stress sont multiples : la pression temporelle, la gestion des urgences, les patients anxieux, la charge administrative croissante et la quête permanente de perfection technique.",
    "Des techniques de respiration, de pleine conscience et de réorganisation du workflow permettent de réduire significativement le niveau de stress sans compromettre la productivité du cabinet.",
    "Investir dans le bien-être de l'équipe soignante n'est pas un luxe — c'est un impératif clinique qui se traduit directement par une meilleure qualité de soins.",
  ],
  [
    "L'excellence clinique ne se résume pas à la maîtrise technique. Elle englobe l'ensemble du parcours patient, de l'accueil au suivi post-traitement, en passant par la communication et l'ergonomie du cabinet.",
    "Les cabinets qui se distinguent par leur excellence ont en commun des protocoles standardisés, une culture d'amélioration continue et un investissement constant dans la formation de leur équipe.",
    "La documentation photographique systématique, le debriefing des cas complexes et le partage d'expérience entre confrères sont des piliers de cette démarche d'excellence.",
    "Nous partageons les habitudes quotidiennes qui, accumulées sur des années de pratique, créent une différence significative dans la qualité des soins et la satisfaction des patients.",
  ],
];

const tagSets = [
  ['Implantologie', 'Complications', 'Protocole'],
  ['Intelligence Artificielle', 'Diagnostic', 'Innovation'],
  ['Bien-être', 'Ergonomie', 'Prévention'],
  ['Excellence', 'Protocoles', 'Formation'],
];

const dates = [
  "23 Avril 2026",
  "16 Avril 2026",
  "9 Avril 2026",
  "2 Avril 2026",
];

const keyTakeawaysSets = [
  [
    "Identifier les signes précoces de complications implantaires",
    "Appliquer un protocole de gestion structuré et reproductible",
    "Communiquer efficacement avec le patient en situation de crise",
    "Mettre en place un suivi post-opératoire préventif",
  ],
  [
    "Comprendre les capacités actuelles de l'IA en dentisterie",
    "Intégrer les outils d'aide au diagnostic dans votre workflow",
    "Évaluer le retour sur investissement des solutions IA",
    "Anticiper les évolutions technologiques à moyen terme",
  ],
  [
    "Identifier vos principaux facteurs de stress en cabinet",
    "Appliquer des techniques de gestion du stress au quotidien",
    "Réorganiser votre planning pour réduire la charge mentale",
    "Créer un environnement de travail propice au bien-être",
  ],
  [
    "Auditer votre parcours patient de bout en bout",
    "Implémenter des protocoles de documentation systématique",
    "Développer une culture d'amélioration continue en équipe",
    "Mesurer et suivre vos indicateurs de qualité clinique",
  ],
];

export const mindshares: Mindshare[] = mindshareFiles.map((file, i) => ({
  id: i + 1,
  posterFile: file,
  title: titles[i],
  subtitle: "Insight · Dental Fairies Academy",
  author: authors[i],
  authorTitle: authorTitles[i],
  date: dates[i],
  readTime: i % 2 === 0 ? "8 min" : "6 min",
  category: categories[i],
  categoryLabel: categoryLabels[i],
  tags: tagSets[i],
  excerpt: excerpts[i],
  content: contents[i],
  keyTakeaways: keyTakeawaysSets[i],
}));

export function getMindshareById(id: number): Mindshare | undefined {
  return mindshares.find(m => m.id === id);
}

export function getPosterUrl(file: string): string {
  return `/mindshares/${encodeURIComponent(file)}`;
}
