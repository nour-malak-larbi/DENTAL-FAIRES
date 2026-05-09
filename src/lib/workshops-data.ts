export interface Workshop {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  posterFile: string;
  instructor: string;
  instructorTitle: string;
  price: string;
  duration: string;
  level: string;
  modules: number;
  description: string;
  objectives: string[];
  curriculum: {
    description: ReactNode;
    title: string;
    duration: string;
    locked: boolean;
  }[];
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Maîtrise de l'Implantologie Antérieure",
    subtitle: "Protocoles esthétiques et gestion des tissus mous",
    category: "chirurgie",
    categoryLabel: "Chirurgie",
    posterFile: "1.jpeg",
    instructor: "Dr. Amine B.",
    instructorTitle: "Spécialiste en Parodontologie & Implantologie",
    price: "45 000 DA",
    duration: "4h 30min",
    level: "Avancé",
    modules: 6,
    description: "Ce workshop intensif vous guidera à travers les étapes critiques de la pose d'implants dans la zone esthétique antérieure. De l'extraction atraumatique à la gestion de l'alvéole et la temporisation immédiate, apprenez des protocoles prévisibles pour des résultats esthétiques optimaux.",
    objectives: [
      "Comprendre la biologie de l'alvéole post-extractionnelle",
      "Maîtriser les techniques d'extraction atraumatique",
      "Savoir quand opter pour l'implantation immédiate",
      "Gérer le profil d'émergence avec la temporisation",
      "Techniques de greffe conjonctive associées"
    ],
    curriculum: [
      { title: "Introduction et Biologie Tissulaire", duration: "45:00", locked: false },
      { title: "Évaluation du Secteur Antérieur", duration: "38:20", locked: false },
      { title: "Protocoles d'Extraction Atraumatique", duration: "52:15", locked: true },
      { title: "Implantation Immédiate vs Différée", duration: "41:10", locked: true },
      { title: "Gestion des Tissus Mous (Greffe Conjonctive)", duration: "65:30", locked: true },
      { title: "Temporisation et Profil d'Émergence", duration: "28:45", locked: true }
    ]
  },
  {
    id: 2,
    title: "Les Facettes en Céramique : De A à Z",
    subtitle: "Préparation, empreinte et collage sous champ opératoire",
    category: "esthetique",
    categoryLabel: "Esthétique",
    posterFile: "2.jpeg",
    instructor: "Dr. Sarah L.",
    instructorTitle: "Experte en Dentisterie Esthétique",
    price: "38 000 DA",
    duration: "3h 45min",
    level: "Intermédiaire",
    modules: 5,
    description: "Démystifiez les facettes pelliculaires et les préparations minimalement invasives. Ce cours vous donne toutes les clés pour réussir vos réhabilitations esthétiques antérieures, du mock-up au collage définitif.",
    objectives: [
      "Réaliser un mock-up direct et indirect",
      "Maîtriser les clés de préparation",
      "Prendre des empreintes de haute précision",
      "Communiquer efficacement avec le laboratoire",
      "Protocoles de collage sous digue"
    ],
    curriculum: [
      { title: "Planification Esthétique et DSD", duration: "35:10", locked: false },
      { title: "Le Mock-up : Outil de validation", duration: "42:00", locked: true },
      { title: "Préparations Orientées (Guides en Silicone)", duration: "55:30", locked: true },
      { title: "Empreinte et Choix du Matériau", duration: "30:45", locked: true },
      { title: "Le Collage : Étapes Critiques", duration: "61:20", locked: true }
    ]
  },
  {
    id: 3,
    title: "Endodontie Rotative Moderne",
    subtitle: "Sécurité et efficacité dans la préparation canalaire",
    category: "endodontie",
    categoryLabel: "Endodontie",
    posterFile: "4.jpeg",
    instructor: "Dr. Karim M.",
    instructorTitle: "Spécialiste en Endodontie",
    price: "25 000 DA",
    duration: "2h 50min",
    level: "Intermédiaire",
    modules: 4,
    description: "Améliorez la prévisibilité de vos traitements endodontiques grâce à la rotation continue et la réciprocité. Découvrez les dernières séquences instrumentales et les protocoles d'irrigation efficaces.",
    objectives: [
      "Comprendre la cinématique des instruments",
      "Réaliser une cavité d'accès optimale",
      "Gérer les courbures complexes",
      "Optimiser l'irrigation et la désinfection",
      "Obturation tridimensionnelle à la gutta chaude"
    ],
    curriculum: [
      { title: "Cavité d'Accès et Repérage", duration: "25:00", locked: false },
      { title: "Perméabilité et Glide Path", duration: "35:15", locked: true },
      { title: "Mise en Forme : Réciprocité vs Rotation", duration: "50:40", locked: true },
      { title: "Désinfection 3D et Obturation Thermique", duration: "58:30", locked: true }
    ]
  },
  {
    id: 4,
    title: "Chirurgie Mucogingivale",
    subtitle: "Recouvrement radiculaire et augmentation gingivale",
    category: "chirurgie",
    categoryLabel: "Parodontologie",
    posterFile: "5.jpeg",
    instructor: "Dr. Fatiha D.",
    instructorTitle: "Parodontologiste Exclusif",
    price: "55 000 DA",
    duration: "5h 15min",
    level: "Avancé",
    modules: 6,
    description: "Apprenez les techniques de micro-chirurgie plastique parodontale pour traiter les récessions gingivales. Du prélèvement palatin aux techniques de lambeau positionné coronairement, maîtrisez les gestes fondamentaux.",
    objectives: [
      "Diagnostiquer et classifier les récessions",
      "Techniques de prélèvement palatin en toute sécurité",
      "Lambeau déplacé coronairement (CAF)",
      "Technique du tunnel",
      "Sutures microchirurgicales"
    ],
    curriculum: [
      { title: "Diagnostic et Indications", duration: "40:00", locked: false },
      { title: "Instrumentation et Grossissement", duration: "30:20", locked: false },
      { title: "Prélèvement Palatin (Épithélio-conjonctif & Conjonctif)", duration: "65:10", locked: true },
      { title: "Le Lambeau Positionné Coronairement", duration: "55:45", locked: true },
      { title: "La Technique du Tunnel", duration: "70:30", locked: true },
      { title: "Sutures et Gestion Post-Opératoire", duration: "53:15", locked: true }
    ]
  },
  {
    id: 5,
    title: "Prothèse Complète Numérique",
    subtitle: "Flux de travail digital de l'empreinte à la PAC",
    category: "prothese",
    categoryLabel: "Prothèse",
    posterFile: "6.jpeg",
    instructor: "Dr. Mehdi K.",
    instructorTitle: "Prothésiste et Concepteur CAO",
    price: "42 000 DA",
    duration: "3h 20min",
    level: "Tous niveaux",
    modules: 4,
    description: "Plongez dans l'ère de la dentisterie numérique pour l'édenté total. Simplifiez vos protocoles cliniques et améliorez l'adaptation de vos prothèses complètes grâce à la conception assistée par ordinateur.",
    objectives: [
      "Numériser les empreintes primaires et secondaires",
      "Enregistrement du rapport intermaxillaire numérique",
      "Design CAO des bases et des dents",
      "Usinage vs Impression 3D en prothèse",
      "Réglages occlusaux finaux"
    ],
    curriculum: [
      { title: "Introduction au Flux Numérique Complet", duration: "35:00", locked: false },
      { title: "Empreintes et Numérisation", duration: "50:20", locked: true },
      { title: "Enregistrement RIM et Montage CAO", duration: "65:40", locked: true },
      { title: "Essayage, Finition et Insertion", duration: "49:00", locked: true }
    ]
  },
  {
    id: 6,
    title: "Le Blanchiment Dentaire Sécurisé",
    subtitle: "Chimie, protocoles et gestion des sensibilités",
    category: "esthetique",
    categoryLabel: "Esthétique",
    posterFile: "7.jpeg",
    instructor: "Dr. Lamia T.",
    instructorTitle: "Omnipraticienne",
    price: "18 000 DA",
    duration: "2h 10min",
    level: "Débutant",
    modules: 3,
    description: "Un tour d'horizon complet sur l'éclaircissement dentaire. Apprenez à choisir les bons agents, à réaliser des gouttières parfaites et à gérer les cas de dyschromies sévères en toute sécurité.",
    objectives: [
      "Différencier les agents de blanchiment",
      "Blanchiment au fauteuil vs ambulatoire",
      "Gérer les sensibilités post-opératoires",
      "Éclaircissement interne des dents dépulpées"
    ],
    curriculum: [
      { title: "Chimie et Législation", duration: "30:00", locked: false },
      { title: "Blanchiment Ambulatoire : Le Gold Standard", duration: "55:30", locked: true },
      { title: "Cas Particuliers et Blanchiment Interne", duration: "44:30", locked: true }
    ]
  }
];

export function getWorkshopById(id: number): Workshop | undefined {
  return workshops.find(w => w.id === id);
}

export function getWorkshopPosterUrl(filename: string): string {
  return `/workshops/${filename}`;
}
