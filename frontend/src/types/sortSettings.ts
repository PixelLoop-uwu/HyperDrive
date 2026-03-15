export type SortField = "name" | "date" | "size"
export type SortOrder = "asc" | "desc"

export type SortState = {
  field: SortField
  order: SortOrder

  setField: (field: SortField) => void
  setOrder: (order: SortOrder) => void
  toDefault: () => void
}
