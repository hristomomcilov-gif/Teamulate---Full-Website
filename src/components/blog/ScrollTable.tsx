import type { ReactNode } from "react";

type ScrollTableProps = {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
  /** First column is a row header by default. */
  rowHeaders?: boolean;
};

export function ScrollTable({ caption, headers, rows, rowHeaders = true }: ScrollTableProps) {
  return (
    <div className="overflow-x-auto rounded-(--tm-radius-md) border border-line bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-navy-900 bg-navy-900 text-white">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 1 ? "bg-surface-muted" : "bg-surface"}>
              {row.map((cell, cellIndex) =>
                rowHeaders && cellIndex === 0 ? (
                  <th
                    key={cellIndex}
                    scope="row"
                    className="px-4 py-3 align-top font-semibold text-ink"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex} className="px-4 py-3 align-top leading-relaxed text-ink-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
