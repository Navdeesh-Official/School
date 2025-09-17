export interface Marks {
  [key: string]: number;
}

export interface SubSubject {
  name: string;
  path: string;
  marks?: Marks;
  icon?: React.FC<{ className?: string }>;
}

export interface Subject {
  name: string;
  path: string;
  subSubjects?: SubSubject[];
  marks?: Marks;
  icon?: React.FC<{ className?: string }>;
}
