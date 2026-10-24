const fields = [
  { label: "Location", value: "Address, City Or Zip", border: "" },
  { label: "Date/Duration", value: "Anytime/3 Days", border: "border-l" },
  {
    label: "Budget",
    value: "$0-$3000",
    border: "border-t md:border-t-0 md:border-l",
  },
  {
    label: "People",
    value: "5-10",
    border: "border-t border-l md:border-t-0",
  },
];

export function SearchBar() {
  return (
    <div className="relative z-10 grid grid-cols-2 bg-white/40 text-white backdrop-blur-md md:flex md:h-[74px]">
      {fields.map((field) => (
        <button
          key={field.label}
          type="button"
          className={`flex flex-col justify-center gap-1 border-white/25 px-5 py-4 text-left transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:flex-1 md:px-6 md:py-0 ${field.border}`}
        >
          <span className="text-base font-semibold md:text-xl">
            {field.label}
          </span>
          <span className="text-sm font-light text-white/85">
            {field.value}
          </span>
        </button>
      ))}

      <button
        type="button"
        className="col-span-2 h-14 border-t border-white/25 bg-brand text-lg font-medium text-white transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:h-auto md:w-48 md:border-t-0 md:border-l"
      >
        Search
      </button>
    </div>
  );
}
