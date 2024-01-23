'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    onClick?: () => void;
}


const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center, 
    onClick

}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-2xl font-titan mt-4">
            {title}
        </div>
        <div className="font-light text-neutral-500 my-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading