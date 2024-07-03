'use client'

import icon1 from '@/public/icons/1.svg';
import icon2 from '@/public/icons/2.svg';
import icon3 from '@/public/icons/3.svg';
import icon4 from '@/public/icons/4.svg';
import notFound from '@/public/icons/not-found.svg';
import sort from '@/public/icons/sort.svg';
import film from '@/public/data-types/film.svg';
import person from '@/public/data-types/person.svg';
import planet from '@/public/data-types/planet.svg';
import species from '@/public/data-types/species.svg';
import starship from '@/public/data-types/starship.svg';
import vehicle from '@/public/data-types/vehicle.svg';
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
  film,
  person,
  planet,
  species,
  starship,
  vehicle,
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
    const SvgIcon = svgIcons[name]
    if(!SvgIcon) return null
    return <div>
        <SvgIcon style={{fill: color}} width={width} height={height}/>
        </div>
}
