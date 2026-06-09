export interface GitHubFile {
  path: string;
  type: "file" | "directory";
  content?: string;
}

export interface AnalysisFinding {
  file: string;
  issues: string[];
}

export interface AnalysisReport {
  originalFilesCount: number;
  findings: AnalysisFinding[];
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  status: "idle" | "running" | "passed" | "failed";
  progress: number;
  logs: string[];
  assertions: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  fitzpatrickSkinType?: number;
  condition?: string;
  severity?: "low" | "moderate" | "high" | "urgent";
  status: "pending" | "processing" | "screened" | "synced";
  diagnosedAt?: string;
}

export interface ScanSample {
  id: string;
  type: "skin" | "eye" | "oral" | "wound";
  title: string;
  conditionName: string;
  confidence: number;
  severity: "low" | "moderate" | "high" | "urgent";
  image: string;
  clinicalRules: string;
  description: string;
}
