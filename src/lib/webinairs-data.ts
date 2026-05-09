
export interface Webinar {
  id: number;
  slug: string;
  posterFile: string;
  title: string;
  subtitle: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  duration: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  description: string;
  objectives: string[];
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  registrationUrl: string;
}

const webinarFiles = [
  "WhatsApp Image 2026-04-20 at 21.14.55 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.55 (2).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.55.jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.56 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.56 (2).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.56 (3).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.56 (4).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.56.jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.57 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.57 (2).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.57 (3).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.57 (4).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.57.jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.58 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.58 (2).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.58 (3).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.58 (4).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.58.jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.59 (1).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.59 (2).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.59 (3).jpeg",
  "WhatsApp Image 2026-04-20 at 21.14.59.jpeg",
];

const titles = [
  "Débat & Éthique Professionnelle",
  "Implantologie Avancée",
  "Esthétique du Sourire",
  "Protocoles Pédiatriques",
  "Orthodontie Numérique",
  "Chirurgie Parodontale",
  "Prothèse sur Implant",
  "Urgences Endodontiques",
  "Photographie Clinique",
  "Gestion de Cabinet Dentaire",
  "Blanchiment Professionnel",
  "Gestion des Complications",
  "Occlusion & ATM",
  "Intelligence Artificielle",
  "Radiologie 3D CBCT",
  "Anesthésie Avancée",
  "Composite Postérieur",
  "Gestion de Finance en Clinique",
  "Facettes Céramiques",
  "Extraction Complexe",
  "Implant Immédiat",
  "Marketing Éthique",
];

const speakers = [
  "Dr. Amina Benali",
  "Dr. Karim Oussama",
  "Dr. Soraya Meziane",
  "Dr. Yacine Hadj",
  "Dr. Nadia Boucherit",
  "Dr. Rachid Tlemcani",
  "Dr. Leila Mansouri",
  "Dr. Omar Zidane",
];

const speakerTitles = [
  "Chirurgienne Orale · Alger",
  "Implantologiste · Constantine",
  "Esthéticienne Dentaire · Oran",
  "Orthodontiste · Annaba",
  "Pédodontiste · Tlemcen",
  "Parodontologiste · Blida",
  "Prothésiste · Sétif",
  "Omnipraticien · Béjaïa",
];

const descriptions = [
  "Une session approfondie qui aborde les fondements scientifiques et les applications pratiques en dentisterie contemporaine. Rejoignez-nous pour une exploration rigoureuse et nuancée.",
  "Maîtrisez les protocoles les plus récents et les techniques chirurgicales d'avant-garde. Cette masterclass intensive est conçue pour les praticiens souhaitant atteindre l'excellence.",
  "Des cas cliniques réels, des discussions expertes et des stratégies éprouvées pour élever votre pratique quotidienne. Une session incontournable pour tout praticien ambitieux.",
];

const categories = ['debat', 'masterclass', 'clinique', 'technique'];
const categoryLabels = ['Débat', 'Masterclass', 'Cas Clinique', 'Technique'];
const levels: Array<'Débutant' | 'Intermédiaire' | 'Avancé'> = ['Débutant', 'Intermédiaire', 'Avancé'];

const tagSets = [
  ['Chirurgie', 'Protocole', 'Implant'],
  ['Esthétique', 'Composite', 'Résine'],
  ['Orthodontie', 'Numérique', 'Aligneur'],
  ['Débat', 'Éthique', 'Deontologie'],
  ['Radiologie', 'CBCT', 'Diagnostic'],
  ['Pédiatrie', 'Enfant', 'Sédation'],
];

const dates = [
  "12 Janvier 2026", "19 Janvier 2026", "26 Janvier 2026",
  "2 Février 2026", "9 Février 2026", "16 Février 2026",
  "23 Février 2026", "2 Mars 2026", "9 Mars 2026",
  "16 Mars 2026", "23 Mars 2026", "30 Mars 2026",
  "6 Avril 2026", "13 Avril 2026", "20 Avril 2026",
  "27 Avril 2026", "4 Mai 2026", "11 Mai 2026",
  "18 Mai 2026", "25 Mai 2026", "1 Juin 2026",
  "8 Juin 2026",
];

export const webinars: Webinar[] = webinarFiles.map((file, i) => ({
  id: i + 1,
  slug: `webinaire-${i + 1}`,
  posterFile: file,
  title: titles[i % titles.length],
  subtitle: "Session exclusive · Dental Fairies Academy",
  speaker: speakers[i % speakers.length],
  speakerTitle: speakerTitles[i % speakerTitles.length],
  date: dates[i],
  duration: i % 4 === 0 ? "90 min" : i % 4 === 1 ? "60 min" : i % 4 === 2 ? "120 min" : "75 min",
  category: categories[i % categories.length],
  categoryLabel: categoryLabels[i % categoryLabels.length],
  tags: tagSets[i % tagSets.length],
  description: descriptions[i % descriptions.length],
  objectives: [
    "Maîtriser les concepts fondamentaux et les applications cliniques avancées",
    "Analyser des cas cliniques réels avec des experts reconnus",
    "Développer une approche systématique et reproductible",
    "Accéder aux supports de cours et certificat de participation",
  ],
  level: levels[i % levels.length],
  registrationUrl: "#inscription",
}));

export function getWebinarById(id: number): Webinar | undefined {
  return webinars.find(w => w.id === id);
}

export function getPosterUrl(file: string): string {
  return `/webinares/${encodeURIComponent(file)}`;
}
