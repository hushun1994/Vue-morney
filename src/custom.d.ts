type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
};

type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => "success" | "duplicated"; // 联合类型
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
};

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  createTagError: Error | null;
  updateTagError: Error | null;
  currentTag?: Tag;
  selectedTags?: string[];
};

// interface Window {}
