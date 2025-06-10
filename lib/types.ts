export interface PlanesEscolares {
  grado: string;
  año: string | number;
  areas: Area[];
}

export interface Area {
  area: string;
  objetivos: string[];
  contenidos: Contenido[];
}

export interface Contenido {
  tema: string;
  conceptual?: string;
  procedimental?: string;
  actitudinal?: string;
  actividades?: string[];
  indicadores?: string[];
  subtemas?: Contenido[]; // Recursive: allows any depth of subtopics
  [key: string]: any; // Additional dynamic properties for max flexibility
}

// If your root JSON is an array:
export type PlanesEscolaresRoot = PlanesEscolares[];
