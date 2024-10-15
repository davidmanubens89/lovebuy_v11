import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Scale, Zap, Repeat, Volume2 } from 'lucide-react';

interface Factor {
  title: string;
  description: string;
  icon: string;
  hoverText: string;
}

interface KeyFactorsProps {
  factors: Factor[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Scale,
  Zap,
  Repeat,
  Volume2,
};

export function KeyFactors({ factors }: KeyFactorsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Key Factors to Consider</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {factors.map((factor, index) => {
          const IconComponent = iconMap[factor.icon];
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center space-x-2">
                      <div className="bg-primary text-primary-foreground p-2 rounded-full">
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <CardTitle>{factor.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{factor.description}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-gray-800 bg-opacity-90 text-white p-2 rounded">
                  <p>{factor.hoverText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </section>
  );
}