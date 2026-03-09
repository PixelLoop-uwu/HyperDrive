export type SortField = "name" | "date" | "size"

export type SortOrder = "asc" | "desc"

export type Sort = {
  field: SortField
  order: SortOrder
}