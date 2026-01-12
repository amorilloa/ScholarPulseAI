
export type SectionId = 
  | 'keywords' 
  | 'nonExpert' 
  | 'universityStudent' 
  | 'professionalColleague' 
  | 'potentialApplications' 
  | 'strengthsAndLimitations' 
  | 'creativeExtensions' 
  | 'summaries';

export interface AnalysisResult {
  keywords?: string[];
  explanations?: {
    nonExpert?: string;
    universityStudent?: string;
    professionalColleague?: string;
  };
  potentialApplications?: string[];
  strengthsAndLimitations?: {
    strengths?: string[];
    limitations?: string[];
  };
  creativeExtensions?: string[];
  summaries?: {
    tweet?: string;
    bulletPoints?: string[];
  };
}

export interface PaperMetadata {
  name: string;
  size: string;
  type: string;
}
