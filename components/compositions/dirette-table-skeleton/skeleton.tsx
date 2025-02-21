import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion";

export const DiretteTableSkeleton = () => {
  return (
    <div className="dirette-table w-full bg-secondary-football rounded-lg">
      {/* Toolbar skeleton */}
      <div className="p-4 border-b border-gray-100/10 flex items-center justify-between">
        <div className="h-9 w-40 bg-gray-200/20 animate-pulse rounded-md" />
        <div className="h-9 w-40 bg-gray-200/20 animate-pulse rounded-md" />
      </div>

      {/* Table content skeleton */}
      <div className="dirette-table-content">
        <Accordion type="multiple" className="w-full" defaultValue={["1", "2", "3"]}>
          {/* Generate 3 skeleton league sections */}
          {[1, 2, 3].map((index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="dirette-table-accordion-item border-b border-gray-100/10"
            >
              <div className="flex w-full gap-4 accordion-trigger-wrapper p-4">
                <div className="h-6 w-6 bg-gray-200/20 animate-pulse rounded-full" />
                <AccordionTrigger className="dirette-table-accordion-trigger">
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-gray-200/20 animate-pulse rounded-full" />
                    <div className="h-6 w-48 bg-gray-200/20 animate-pulse rounded-md" />
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent className="dirette-table-accordion-content px-4">
                {/* Generate 3 skeleton rows per league */}
                {[1, 2, 3].map((rowIndex) => (
                  <div
                    key={rowIndex}
                    className="diretta-row grid items-center py-3 hover:bg-gray-100/5 transition-colors"
                    style={{ gridTemplateColumns: "5% 10% 30% 10% 30% 15%" }}
                  >
                    <div className="h-6 w-6 bg-gray-200/20 animate-pulse rounded-full" />
                    <div className="h-5 w-14 bg-gray-200/20 animate-pulse rounded-md mx-auto" />
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 bg-gray-200/20 animate-pulse rounded-full" />
                      <div className="h-5 w-36 bg-gray-200/20 animate-pulse rounded-md" />
                    </div>
                    <div className="h-5 w-20 bg-gray-200/20 animate-pulse rounded-md mx-auto" />
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 bg-gray-200/20 animate-pulse rounded-full" />
                      <div className="h-5 w-36 bg-gray-200/20 animate-pulse rounded-md" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200/20 animate-pulse rounded-md mx-auto" />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};