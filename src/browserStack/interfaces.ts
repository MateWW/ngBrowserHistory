export interface HistoryElement {
  id: number;
  url: string;
}

export interface FilteredHistoryElement {
  id: number;
  url: string;
  segmentName: string;
  segmentId: number;
}
