interface MultiSelectWithTagsProps<T> {
  options: T[];
  selectedOptions: T[];
  onSelectionChange: (selected: T[]) => void;
  labelExtractor?: (option: T) => string;
}

export function MultiSelectWithTags<T extends string | number>({
  options,
  selectedOptions,
  onSelectionChange,
}: MultiSelectWithTagsProps<T>) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T;
    if (!selectedOptions.includes(value)) {
      onSelectionChange([...selectedOptions, value]);
    }
  };

  const removeTag = (value: T) => {
    onSelectionChange(selectedOptions.filter((option) => option !== value));
  };

  return (
    <div className="w-72">
      <div className="flex flex-wrap gap-2 mb-2 capitalize">
        {selectedOptions.map((option) => (
          <div
            key={String(option)}
            className="flex items-center px-2 py-1 bg-blue-600 text-white text-sm rounded-md"
          >
            {option}
            <button
              onClick={() => removeTag(option)}
              className="ml-2 text-white hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <select
        className="w-full py-2 px-3 dark:bg-primary-dark bg-primary-light rounded-md ring-2 focus:outline-none capitalize"
        onChange={handleSelectChange}
        value=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={String(option)} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
