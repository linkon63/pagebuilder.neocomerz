import React from 'react';
import { SizeChartProps } from '../../../ui-package/types';
import SectionHeader from '../ui/SectionHeader';

export default function SizeChart({
  title,
  description,
  sizeChart,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: SizeChartProps) {
  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader
          title={title}
          description={description}
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-[56px] lg:leading-[64px]"
          descriptionClassName="max-w-4xl mx-auto mt-6 text-zinc-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: colors.primary }}>
                    {sizeChart.headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-white font-semibold text-sm md:text-base"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 text-gray-700 text-sm md:text-base border-t border-gray-200"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
