'use client'

import icon1 from '@/public/icons/1.svg';
import icon2 from '@/public/icons/2.svg';
import icon3 from '@/public/icons/3.svg';
import icon4 from '@/public/icons/4.svg';
import notFound from '@/public/icons/not-found.svg';
import sort from '@/public/icons/sort.svg';
import films from '@/public/data-types/films.svg';
import people from '@/public/data-types/people.svg';
import planets from '@/public/data-types/planets.svg';
import species from '@/public/data-types/species.svg';
import starships from '@/public/data-types/starships.svg';
import vehicles from '@/public/data-types/vehicles.svg';
import logo from '@/public/logo.svg';
import github from '@/public/icons/github.svg';

type SvgIcons = {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const svgIcons: SvgIcons = {
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  notFound,
  sort,
  films,
  people,
  planets,
  species,
  starships,
  vehicles,
  logo,
  github
};

export default function Svg({name, width = 20, height = 20, color = 'var(--onPrimary)'} : 
  {
    name: string,
    width?: number,
    height?: number,
    color?: string,
  })
{
    const SvgIcon = svgIcons[name] ?? svgIcons['notFound']
    return <div suppressHydrationWarning>
      {
        SvgIcon &&
        <SvgIcon  style={{fill: color}} width={width} height={height} suppressHydrationWarning/>
      }
        </div>
}
