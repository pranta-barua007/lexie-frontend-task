import { FC } from 'react';

type CardProps = {
  title: string;
  location: string;
  photographer: string;
  img: string;
  link: string;
};

const Card: FC<CardProps> = ({ title, img, location, photographer, link }) => {
  return (
    <div className="mt-6 transform rounded-tl-2xl rounded-br-2xl bg-slate-800 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl ">
      <div className="card-img-top w-full rounded-tl-2xl">
        <img
          className="h-[284px] w-[512px]"
          width={'512px'}
          height={'284px'}
          src={img}
          alt={'photo'}
        />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute bottom-full w-full text-white">
          <div className="absolute bottom-full w-full overflow-hidden pb-5">
            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              className="tranform absolute bottom-0 h-full w-full"
              style={{
                transformOrigin: 'top center',
                transform: 'scale(2)',
              }}
            >
              <path d="M0 25h25L75 0h25v50H0z" fill="rgb(30 41 59)"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="mb-2 text-3xl text-white">{title}</h2>
        <p className="text-xl">Captured By: {photographer ? photographer : 'Unknown'}</p>
        <p className="mb-0">
          <span className="text-gray-400">{location ? location : 'Unknown'}</span>
        </p>
        <div className="flex gap-4 py-4 text-lg">
          {link && (
            <a
              className="hover:text-pond animate-pulse text-sky-400"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
