import { ComponentProps } from 'react';

export const BackgroundLogo = ({
  viewBox = '0 0 97 298',
  ...props
}: ComponentProps<'svg'>) => {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M85.5606 195.998C77.732 198.97 68.9512 195.108 65.9441 187.377L57.1409 164.737C55.6563 165.736 54.0584 166.581 52.3706 167.248L95.2766 277.598C98.2837 285.337 94.377 294.018 86.5559 296.99L86.5635 296.998C78.7349 299.97 69.9541 296.108 66.947 288.377L2.01711 121.395C-0.989967 113.655 2.91677 104.975 10.7378 102.003C18.5664 99.0299 27.3472 102.892 30.354 110.624L34.2395 120.617C35.9024 119.988 37.6497 119.531 39.4597 119.266L1.01418 20.3946C-1.9929 12.6554 1.91384 3.97519 9.73489 1.00254C17.5635 -1.97012 26.3443 1.89218 29.3511 9.62363L94.2737 176.598C97.2808 184.337 93.374 193.018 85.553 195.99L85.5606 195.998Z"
        fill="currentColor"
      />
    </svg>
  );
};
