import type { Dispatch, SetStateAction } from 'react';
import kebabCase from 'kebab-case';

type TabProps<T extends readonly string[]> = {
  options: T;
  set: Dispatch<SetStateAction<T[number]>>;
  selected: T[number];
  ariaLabel?: string;
};

const RadioTab = <T extends string = string>({
  label,
  selected,
  set,
  groupName,
}: {
  label: T;
  selected: T;
  set: Dispatch<SetStateAction<T>>;
  groupName: string;
}) => {
  const isSelected = selected === label;

  return (
    <label
      aria-selected={selected === label}
      className="relative first-of-type:rounded-l-md last-of-type:rounded-r-md w-full text-center bg-slate-200 px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-300 ring-inset hover:bg-indigo-50 focus-within:z-10 has-checked:bg-slate-50 cursor-pointer select-none transition-colors has-checked:font-semibold"
      role="tab"
    >
      <input
        aria-describedby={`${groupName}-description`}
        checked={isSelected}
        className="sr-only"
        name={groupName}
        type="radio"
        value={label}
        onChange={(e) => set(e.target.value as T)}
      />
      <span aria-hidden={!isSelected}>{label}</span>
    </label>
  );
};

export const TabSelect = <T extends readonly string[]>({
  options,
  selected,
  set,
  ariaLabel = 'Tab selection',
}: TabProps<T>) => {
  const groupName = `tab-group-${kebabCase(options.join('-'))}`;

  return (
    <div
      aria-label={ariaLabel}
      className="isolate flex group ring-indigo-400 focus-within:ring-2 ring-offset-2 focus-within:ring-offset-slate-100 rounded-md hover:ring-2"
      role="tablist"
    >
      {options.map((option) => (
        <RadioTab
          key={option}
          groupName={groupName}
          label={option}
          selected={selected}
          set={set}
        />
      ))}
    </div>
  );
};
