export interface EditRowPopupProps {
  savablePage: string;
  uniqueKey: string;
  rowData: any;
  onUpdate: (response: any) => void;
  onClose: () => void;
}

export interface Data {
  [key: string]: any;
}

export interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export interface ListComponentProps {
  data: Data[];
  columns: string[];
  stripedRows: boolean;
  sorting: boolean;
  columnSearch: boolean;
  uniqueKey: string;
  setEditPopupVisible: (visible: boolean) => void;
  setEditableRow: (row: Data) => void;
  fieldsToUpdate: string;
}

export interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export interface HeaderProps {
  label: string;
}
