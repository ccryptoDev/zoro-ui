import * as React from 'react';
import { SVGProps } from 'react';

const SvgVault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22.1733C17.5228 22.1733 22 17.6962 22 12.1733C22 6.65049 17.5228 2.17334 12 2.17334C6.47715 2.17334 2 6.65049 2 12.1733C2 17.6962 6.47715 22.1733 12 22.1733ZM12 24.1733C18.6274 24.1733 24 18.8008 24 12.1733C24 5.54592 18.6274 0.17334 12 0.17334C5.37258 0.17334 0 5.54592 0 12.1733C0 18.8008 5.37258 24.1733 12 24.1733Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.89465 6.72635C6.64766 6.23237 6.04698 6.03214 5.55301 6.27913C5.05903 6.52612 4.8588 7.12679 5.10579 7.62077L6.38219 10.1736H8.61825L6.89465 6.72635ZM10.6183 14.1736L12.0002 16.9375L13.3822 14.1736H15.6183L12.8946 19.6208C12.7253 19.9596 12.379 20.1736 12.0002 20.1736C11.6214 20.1736 11.2752 19.9596 11.1058 19.6208L8.38219 14.1736H10.6183ZM17.6183 10.1736H15.3822L17.1058 6.72635C17.3528 6.23237 17.9535 6.03214 18.4474 6.27913C18.9414 6.52612 19.1416 7.12679 18.8946 7.62077L17.6183 10.1736Z"
      fill="currentColor"
    />
    <path
      d="M5 11.1738C5 10.6215 5.44772 10.1738 6 10.1738H18C18.5523 10.1738 19 10.6215 19 11.1738C19 11.7261 18.5523 12.1738 18 12.1738H6C5.44772 12.1738 5 11.7261 5 11.1738Z"
      fill="currentColor"
    />
    <path
      d="M5 14.1738C5 13.6215 5.44772 13.1738 6 13.1738H18C18.5523 13.1738 19 13.6215 19 14.1738C19 14.7261 18.5523 15.1738 18 15.1738H6C5.44772 15.1738 5 14.7261 5 14.1738Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgVault;
