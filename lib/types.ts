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
}

// If your root JSON is an array:
export type PlanesEscolaresRoot = PlanesEscolares[];
