export interface MultiSelectWithTagsProps<T> {
  options: T[];
  labelExtractor?: (option: T) => string;
}
