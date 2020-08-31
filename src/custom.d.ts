type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
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

interface Window {
  tagList: Tag[];
}
